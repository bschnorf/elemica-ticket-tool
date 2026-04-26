# Block 3 · Build — the AI Triage skill

**Time**: 2:15–3:00 (45 min)
**Capability**: Build skills
**What done looks like**: clicking 🤖 AI Triage on a ticket returns real classification — category, severity, target systems, assumptions.
**Owner**: you. **Stuck?** raise 🙋 — Yuval is in main room for the full block.

This is the **centerpiece**. Everything else is in service of this.

---

## Read the contract first

Open `lib/triage.js`. Read the comment block at the top. **That's the spec.** You're going to fill in the function below it.

The contract specifies:
- Input: a `ticket` object with `subject`, `body`, `category`, `severity`, etc.
- Output: an object with `ticket_id`, `category`, `severity`, `target_systems`, `summary`, `assumptions`, `unverified`.
- Constraints: read-only, no writes anywhere, never invent a category if it doesn't fit.

**Yuval's rule**: if you can't explain a step in two sentences, the step is wrong. Refactor the skill, not the explanation.

---

## Step 1 — Wire AI Triage to Anthropic's API (15 min, live with Yuval)

Paste this into Claude Code:

> Open `lib/triage.js`. Replace the stub with a real call to Anthropic's Messages API. Use `process.env.ANTHROPIC_API_KEY`. The system prompt must instruct the model to classify the ticket into one of these categories: `edi-mapping`, `xcarrier-change`, `sap-request`, `escalation`, `legacy-deployment`, `idx-extraction`, `infra-cloud`, `unknown`. Severity: `low | medium | high | urgent`. Return JSON matching the exact shape in the comment block. If the API key is missing, return the original stub with a note. Use the SDK `@anthropic-ai/sdk`.

You may need:
```bash
npm install @anthropic-ai/sdk
```

Then add `ANTHROPIC_API_KEY=sk-ant-...` to your `.env` file.

Restart the server (`npm start`).

✅ **Done criteria**: open any ticket in the inbox, click 🤖 AI Triage, the result panel pill flips from gold ("stub") to green ("live"). The output shows real category + severity + assumptions pulled from the ticket text.

---

## Step 2 — Run on a real ticket (5 min)

Open `SAP-ESC-3304` (the P1 escalation). Click 🤖 AI Triage.

You should see:
- `category: escalation`
- `severity: urgent`
- `target_systems: [SAP S/4HANA, Cloud Connector v2.16.4, FedEx, UPS, DHL EU]`
- A specific summary, with at least one named assumption and one unverified claim

If anything is missing or wrong, that's a sign your system prompt isn't precise enough. Tighten and retry.

---

## Step 3 — Pair-review (10 min, paired)

You'll be assigned a partner via Zoom breakout. **Reviewer drives** — you click the buttons on YOUR partner's tool. They click yours.

Use the **3 + 1 + 1 format**:

1. **3 things that work** — be specific. "The summary captured the customer name correctly" beats "looks good".
2. **1 thing to improve** — pick the one with the most impact. Not five small ones.
3. **1 question you'd ask the user** — the gap their tool didn't fill yet.

5 min per direction. Swap.

---

## Step 4 — Wire a second TODO (15 min, intermediate+)

Pick one based on your daily work:

| If you handle… | Wire up | File |
|---|---|---|
| PR-to-SOW (Lokesh, Vaibhav) | 📋 PR Form | `lib/pr-form.js` |
| Recurring tickets (Aman, Jeya, Trenton) | 🔍 Find Similar | `lib/similar.js` |
| Customer-facing replies (Sirish, Malay) | 💬 Draft Reply | `lib/reply.js` |

Each file has its own contract in the comment block. **Same pattern as triage** — read the contract, ask Claude to fill it in, restart, click, see live result.

---

## What you'll have at 3:00

- Your AI Triage button is live, classifying real tickets via Anthropic's API
- You've seen another attendee's tool work too (peer review)
- (If intermediate+) at least one more TODO button is wired

**Block 4 starts at 3:00. Open `block-4-design-deploy.md`.**
