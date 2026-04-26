# Elemica Ticket Tool

The starter repo for the **Elemica R&D × Adva Solutions Claude Code Workshop** — April 29, 2026.

By 13:00 your version is live at `https://<your-name>-tickets.onrender.com` with at least one AI button wired to your real queue.

---

## ⚡ 60-second quick start

```bash
# 1. FORK this repo to your own GitHub:
#    👉 https://github.com/Yuvalkesh/elemica-ticket-tool/fork
#    (Render needs YOUR fork to deploy — git clone is not enough.)

# 2. Then clone your fork (replace <your-username>):
git clone https://github.com/<your-username>/elemica-ticket-tool.git
cd elemica-ticket-tool

# 3. Install + run
npm install
npm start
# → open http://localhost:3000
```

You should see a dark ticket inbox with 10 mock tickets. **If you do, you're set for April 29.**

---

## 🚀 One-click deploy to Render (we'll do this in Block 4)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Yuvalkesh/elemica-ticket-tool)

Render reads `render.yaml` and provisions everything automatically. Free tier — 750 instance hours/month, GitHub auto-deploy on every push.

---

## 👥 Who owns what during the workshop

| Stage | Owner | If you're stuck, ask… |
|---|---|---|
| Setup (pre-workshop) | You | **Matan** — `matan@adva-solutions.com` |
| Block 1 (Connect: GitHub) | You | **Trenton + Sloan** (advanced co-pilots in Zoom) |
| Block 2 (Connect: Jira) | You | **Trenton + Sloan** |
| Block 3 (Build skill) | You | **Yuval** (live, main room) |
| Block 4 (Design + deploy) | You | **Yuval** |
| 30 days after | You | **Matan** — `matan@adva-solutions.com` |

**The deal**: drop a 🙋 in Zoom chat any time you're stuck. The co-pilots check chat every minute.

---

## 📚 Workshop block-by-block — open these as you go

The `workshop/` folder has the exact prompts to paste into Claude Code, per block. **Open the right one when we hit that block.** No improvising.

| Time | Block | Guide |
|---|---|---|
| 0:30 – 1:15 | Connect · GitHub | [`workshop/block-1-connect-github.md`](workshop/block-1-connect-github.md) |
| 1:15 – 2:00 | Connect · Jira | [`workshop/block-2-connect-jira.md`](workshop/block-2-connect-jira.md) |
| 2:15 – 3:00 | Build · the AI Triage skill | [`workshop/block-3-build-skill.md`](workshop/block-3-build-skill.md) |
| 3:00 – 3:30 | Design + ship · deploy to Render | [`workshop/block-4-design-deploy.md`](workshop/block-4-design-deploy.md) |

Plus [`workshop/LIVE_PROMPTS.md`](workshop/LIVE_PROMPTS.md) — every big prompt Yuval uses, ready to paste.

---

## 🎯 What's already built

- **Ticket inbox** — sortable, filterable list of incoming tickets (`/`)
- **Single ticket view** — full ticket detail with four TODO action buttons (`/ticket?id=…`)
- **Submit form** — paste a new ticket into the system (`/submit`)
- **Express API** — `GET/POST /api/tickets`, plus four stub endpoints
- **Render config** — one-click deploy via `render.yaml`
- **Mock data** — ten realistic Elemica tickets covering EDI / XCarrier / SAP / IDX / cloud

## 🛠 What's TODO (you build these in the workshop)

| # | Button | Endpoint | Lives in | What it should do |
|---|---|---|---|---|
| 1 | 🤖 **AI Triage** | `POST /api/tickets/:id/triage` | `lib/triage.js` | Classify category, severity, target system. **Centerpiece of Block 3.** |
| 2 | 📋 **Generate PR Form** | `POST /api/tickets/:id/pr-form` | `lib/pr-form.js` | Produce the PR-to-SOW form with bottom-up estimate. |
| 3 | 🔍 **Find Similar** | `POST /api/tickets/:id/similar` | `lib/similar.js` | Search ticket history for related issues. |
| 4 | 💬 **Draft Reply** | `POST /api/tickets/:id/reply` | `lib/reply.js` | Customer-facing draft, gated by human verification. |

Each TODO has a **comment block at the top of the file** that's the contract. Read it before asking Claude to fill it in.

---

## 📦 Repo layout

```
elemica-ticket-tool/
├── README.md                  ← you are here
├── server.js                  ← Express server, all routes
├── package.json
├── render.yaml                ← Render auto-deploy config
├── .env.example
├── data/
│   └── tickets.json           ← 10 mock Elemica tickets (anonymized)
├── public/
│   ├── index.html             ← ticket inbox
│   ├── ticket.html            ← single ticket + 4 TODO buttons
│   ├── submit.html            ← submit form
│   ├── styles.css
│   └── app.js
├── lib/
│   ├── triage.js              ← TODO #1
│   ├── pr-form.js             ← TODO #2
│   ├── similar.js             ← TODO #3
│   └── reply.js               ← TODO #4
└── workshop/                  ← per-block guides + prompt cheat-sheet
    ├── block-1-connect-github.md
    ├── block-2-connect-jira.md
    ├── block-3-build-skill.md
    ├── block-4-design-deploy.md
    └── LIVE_PROMPTS.md
```

---

## 🧱 Stack & decisions

- **Node 20+** runtime
- **Express** — one file, ~80 lines
- **No build step** — vanilla HTML + CSS + JS in `public/`
- **JSON file as the database** — `data/tickets.json` is the source of truth
- **Render** for deployment — free tier, GitHub auto-deploy, ~30 second cold start

Why no React/build pipeline: every line in this repo is meant to be readable in 30 seconds. Beginners can hold the whole thing in their head; advanced users can extend without fighting a framework.

---

## After the workshop

Fork stays yours forever. Customize for your own ticket queue, push patterns the whole team can re-use back to `main`. This repo is the seed of the **Elemica internal tools repo** Blake described in the readiness assessment.

Questions? Email Matan — `matan@adva-solutions.com` — subject line `[Elemica follow-up]`.

— Adva Solutions · April 2026
