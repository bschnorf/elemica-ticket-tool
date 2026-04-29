# Elemica Ticket Tool

Internal ticket triage tool with AI assist. Inbox of incoming tickets, single-ticket detail view, submit form, and a row of AI actions per ticket.

---

## ⚡ Quick start

```bash
git clone https://github.com/<your-org>/elemica-ticket-tool.git
cd elemica-ticket-tool
npm install

# Add your Anthropic API key (or skip — the AI actions fall back to stubs without one)
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY

npm run dev
# → open http://localhost:3000
```

The dev script uses Node's built-in `--env-file=.env` flag, so no dotenv dependency.

### Auth

The UI is gated behind a single shared password. Set `APP_PASSWORD` in `.env` to enable it; leave it blank for an open dev instance. Set `SESSION_SECRET` to a stable random hex string (e.g. `openssl rand -hex 32`) so login sessions survive server restarts — without it, a fresh secret is generated on each boot and everyone has to log in again.

---

## 🚀 Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Yuvalkesh/elemica-ticket-tool)

Render reads `render.yaml` and provisions everything automatically. Free tier — 750 instance hours/month, GitHub auto-deploy on every push.

---

## 🎯 What's in here

- **Ticket inbox** (`/`) — sortable, filterable list
- **Single ticket view** (`/ticket.html?id=…`) — full ticket detail + AI actions
- **Submit form** (`/submit.html`) — paste a new ticket into the system
- **Express API** — `GET/POST /api/tickets` plus the AI action endpoints below
- **Mock data** — ten realistic Elemica tickets covering EDI / XCarrier / SAP / IDX / cloud

## 🛠 AI actions

Each ticket page exposes five AI actions. `lib/triage.js` and `lib/explain.js` are wired to the Anthropic API; the others are stubs you can fill in the same way.

| # | Button | Endpoint | Lives in | What it does |
|---|---|---|---|---|
| 1 | 🤖 **AI Triage** | `POST /api/tickets/:id/triage` | `lib/triage.js` | Classify category, severity, target system, summary, assumptions, unverified claims. **Live.** |
| 2 | 📋 **Generate PR Form** | `POST /api/tickets/:id/pr-form` | `lib/pr-form.js` | Produce the PR-to-SOW form with a bottom-up estimate. Stub. |
| 3 | 🔍 **Find Similar** | `POST /api/tickets/:id/similar` | `lib/similar.js` | Search ticket history for related issues. Stub. |
| 4 | 💬 **Draft Reply** | `POST /api/tickets/:id/reply` | `lib/reply.js` | Customer-facing draft, gated by human verification. Stub. |
| 5 | 📣 **Plain English** | `POST /api/tickets/:id/explain` | `lib/explain.js` | Translate the ticket into a non-technical headline + plain-English explanation for stakeholders outside engineering. **Live.** |

Each `lib/*.js` action follows the same shape: gate on `process.env.ANTHROPIC_API_KEY`, fall back to a stub when missing, and return a JSON-schema-validated object on the live path.

---

## 📦 Repo layout

```
elemica-ticket-tool/
├── README.md
├── server.js                  ← Express server, all routes
├── package.json
├── render.yaml                ← Render auto-deploy config
├── .env.example
├── data/
│   └── tickets.json           ← mock Elemica tickets
├── public/
│   ├── index.html             ← ticket inbox
│   ├── ticket.html            ← single ticket + AI actions
│   ├── submit.html            ← submit form
│   ├── styles.css
│   └── app.js
└── lib/
    ├── triage.js              ← live (Anthropic SDK)
    ├── explain.js             ← live (Anthropic SDK)
    ├── pr-form.js             ← stub
    ├── similar.js             ← stub
    └── reply.js               ← stub
```

---

## 🧱 Stack

- **Node 20+** runtime (uses built-in `--env-file`)
- **Express** — one file
- **No build step** — vanilla HTML + CSS + JS in `public/`
- **JSON file as the database** — `data/tickets.json` is the source of truth
- **Anthropic SDK** — `claude-opus-4-7` with adaptive thinking and JSON-schema-constrained output
- **Render** for deployment — free tier, GitHub auto-deploy
