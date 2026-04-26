# Block 4 · Design + ship — the surface your team will use

**Time**: 3:00–3:30 (30 min)
**Capability**: Design tools
**What done looks like**: your tool is live at `https://<your-name>-tickets.onrender.com`, posted in Zoom chat.
**Owner**: you. **Stuck?** raise 🙋 — Yuval is in main room.

---

## Step 1 — Design 101 review (5 min, conceptual)

Before we deploy, look at your tool with fresh eyes:

- **Severity colour ladder** — urgent (red, pulsing), high (gold), medium (blue), low (grey). Your eye finds urgent first. That's the design doing work.
- **Category tags** — pattern-recognition, not reading. Every category has a colour.
- **The four buttons clustered together** — they're siblings. The layout says so.
- **Verify gate at the bottom of the Reply panel** — last thing your eye sees before sending. Not buried. Not skippable.

**Design rule**: if a teammate has to read the docs to use your tool, the design failed. Designed for *you, six months from now* — that's the test.

If you have a few minutes and feel inspired, ask Claude:

> The current submit form is functional. Suggest 3 small design improvements that would make it feel more polished — but only ones that take less than 2 minutes each. No new dependencies.

Apply zero, one, or all three. Your call.

---

## Step 2 — Push to GitHub (1 min)

Make sure all your work from Blocks 1–3 is committed and pushed:

```bash
git status        # should be clean
git log --oneline -5
git push
```

---

## Step 3 — Deploy to Render (10 min)

Two paths. Pick whichever your IT setup allows.

### Path A — One-click deploy (fastest)

Click the **Deploy to Render** button in your fork's README. Render picks up `render.yaml`, provisions a web service, builds, deploys. Takes 3–5 minutes.

### Path B — Manual (if Path A is blocked)

1. Go to <https://render.com/dashboard>
2. Click **New → Web Service**
3. Pick your fork
4. Settings (most are auto-filled from `render.yaml`):
   - Name: `<your-name>-tickets`
   - Plan: **Free**
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variable in Render dashboard:
   - `ANTHROPIC_API_KEY = sk-ant-…` (the same key from Block 3's `.env`)
6. Click **Create Web Service**

---

## Step 4 — Watch it go live (3 min)

In the Render dashboard, click your service → **Logs** tab.

You'll see (in order):
```
==> Cloning from https://github.com/<you>/elemica-ticket-tool...
==> Running 'npm install'
==> Installing dependencies
==> Running 'npm start'
elemica-ticket-tool · http://localhost:3000
==> Your service is live at https://<your-name>-tickets.onrender.com
```

Open the URL. Click 🤖 AI Triage on any ticket. **It works on the public internet.**

---

## Step 5 — Share + celebrate (3 min)

**Drop your URL in Zoom chat.** All eleven URLs in one place — that's the cohort's shared milestone.

The verify-gate-as-design slide explained why this matters: design = ethics, with extra steps. The gate isn't a feature, it's the design that makes the feature trustworthy. If you wired the Reply button, your gate is encoded right there in the response. Test it before you trust it.

---

## After the workshop

- **Week 1**: use your live URL on real (anonymized) tickets daily
- **Week 2**: wire up the remaining TODO buttons; push your fork into a shared `elemica-tools` internal repo
- **Week 3**: 30-minute weekly demo — each attendee shows one improvement
- **Week 4**: connect the tool to real Jira/Zendesk; measure hours saved per ticket; report to Blake

**Friday Slack poll, every week**: ① Is your URL still up? ② How many TODOs wired? ③ Have you shown it to anyone outside R&D?

Target: 60%+ still using by day 30.

Questions in the next 30 days? **Matan** — `matan@adva-solutions.com` — subject `[Elemica follow-up]`.
