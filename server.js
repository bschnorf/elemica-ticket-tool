import express from "express";
import crypto from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { triage } from "./lib/triage.js";
import { generatePrForm } from "./lib/pr-form.js";
import { findSimilar } from "./lib/similar.js";
import { draftReply } from "./lib/reply.js";
import { explain } from "./lib/explain.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "data", "tickets.json");

// ─── auth ──────────────────────────────────────────────────────────────────
const APP_PASSWORD = process.env.APP_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const sign = (payload) =>
  crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");

const issueCookie = (res, secure) => {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })).toString("base64url");
  const cookie = `${payload}.${sign(payload)}`;
  res.setHeader(
    "Set-Cookie",
    `app_session=${cookie}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_MS / 1000}${secure ? "; Secure" : ""}`,
  );
};

const isAuthed = (req) => {
  if (!APP_PASSWORD) return true;
  const raw = (req.headers.cookie || "")
    .split(";").map((c) => c.trim()).find((c) => c.startsWith("app_session="));
  if (!raw) return false;
  const [payload, sig] = raw.slice("app_session=".length).split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && exp > Date.now();
  } catch { return false; }
};

const ASSET_RX = /\.(css|js|woff2?|ico|png|jpg|jpeg|svg|map)$/;
const requireAuth = (req, res, next) => {
  if (!APP_PASSWORD) return next();
  if (req.path === "/login" || ASSET_RX.test(req.path)) return next();
  if (isAuthed(req)) return next();
  if (req.path.startsWith("/api/")) return res.status(401).json({ error: "auth required" });
  return res.redirect(302, "/login");
};

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(requireAuth);

app.get("/login", (_req, res) => res.sendFile(join(__dirname, "public", "login.html")));

app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const submitted = (req.body?.password || "").toString();
  const ok =
    APP_PASSWORD &&
    submitted.length === APP_PASSWORD.length &&
    crypto.timingSafeEqual(Buffer.from(submitted), Buffer.from(APP_PASSWORD));
  if (!ok) return res.redirect(302, "/login?err=1");
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";
  issueCookie(res, secure);
  res.redirect(302, "/");
});

app.post("/logout", (_req, res) => {
  res.setHeader("Set-Cookie", "app_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
  res.redirect(302, "/login");
});

app.use(express.static(join(__dirname, "public")));

const loadTickets = async () => JSON.parse(await readFile(DATA_PATH, "utf8"));
const saveTickets = async (t) => writeFile(DATA_PATH, JSON.stringify(t, null, 2));

// ─── REST: tickets ─────────────────────────────────────────────────────────
app.get("/api/tickets", async (_req, res) => {
  const tickets = await loadTickets();
  res.json(tickets);
});

app.get("/api/tickets/:id", async (req, res) => {
  const tickets = await loadTickets();
  const t = tickets.find((x) => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "ticket not found" });
  res.json(t);
});

app.post("/api/tickets", async (req, res) => {
  const { subject, body, category = "unknown", severity = "medium", reporter = "self" } = req.body ?? {};
  if (!subject || !body) return res.status(400).json({ error: "subject and body are required" });
  const tickets = await loadTickets();
  const id = `TKT-${String(Date.now()).slice(-6)}`;
  const ticket = { id, subject, body, category, severity, reporter, status: "open", created: new Date().toISOString() };
  tickets.unshift(ticket);
  await saveTickets(tickets);
  res.status(201).json(ticket);
});

// ─── AI action endpoints ───────────────────────────────────────────────────
app.post("/api/tickets/:id/triage", async (req, res) => {
  const tickets = await loadTickets();
  const ticket = tickets.find((x) => x.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "ticket not found" });
  const result = await triage(ticket);
  res.json(result);
});

app.post("/api/tickets/:id/pr-form", async (req, res) => {
  const tickets = await loadTickets();
  const ticket = tickets.find((x) => x.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "ticket not found" });
  const result = await generatePrForm(ticket);
  res.json(result);
});

app.post("/api/tickets/:id/similar", async (req, res) => {
  const tickets = await loadTickets();
  const ticket = tickets.find((x) => x.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "ticket not found" });
  const result = await findSimilar(ticket, tickets);
  res.json(result);
});

app.post("/api/tickets/:id/reply", async (req, res) => {
  const tickets = await loadTickets();
  const ticket = tickets.find((x) => x.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "ticket not found" });
  const result = await draftReply(ticket);
  res.json(result);
});

app.post("/api/tickets/:id/explain", async (req, res) => {
  const tickets = await loadTickets();
  const ticket = tickets.find((x) => x.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "ticket not found" });
  const result = await explain(ticket);
  res.json(result);
});

// ─── boot ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`elemica-ticket-tool · http://localhost:${PORT}`);
});
