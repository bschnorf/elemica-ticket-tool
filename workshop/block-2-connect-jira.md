# Block 2 · Connect — apps that didn't talk, now talking

**Time**: 1:15–2:00 (45 min)
**Capability**: Connect (part 2 of 2)
**What done looks like**: your inbox reads from real Jira (or stays on mock as a fallback).
**Owner**: you. **Stuck?** raise 🙋 in Zoom chat.

---

## The pattern

Every API integration in this workshop follows the same shape:
```
parse  →  call  →  validate  →  store
```

You'll do this once for Jira. Then you can do it for Zendesk, Confluence, Slack, your iFlow Platform — same pattern, different shape.

---

## Step 1 — Get a Jira API token (3 min, optional)

If you don't have Jira creds for the workshop, skip this step — you'll stay in mock mode and still complete the block. Either is fine.

1. Go to <https://id.atlassian.com/manage-profile/security/api-tokens>
2. Click "Create API token"
3. Copy the value
4. In your repo, copy `.env.example` → `.env` and fill in:
   ```
   JIRA_BASE_URL=https://elemica.atlassian.net
   JIRA_EMAIL=you@elemica.com
   JIRA_API_TOKEN=<paste>
   ```

**Never commit `.env`.** It's in `.gitignore`.

---

## Step 2 — Wire `/api/tickets` to Jira (10 min)

Paste this prompt to Claude Code:

> In `server.js`, the `GET /api/tickets` handler currently reads from `data/tickets.json`. Add a second mode: when env var `JIRA_BASE_URL` is set, fetch from Jira's `/rest/api/3/search?jql=project=EDI&maxResults=20` instead. Map Jira's response into our ticket shape (`id`, `subject`, `body`, `category`, `severity`, `reporter`, `created`). Keep the JSON file path as a fallback so the app still runs without creds. Test by restarting the server.

You should see:
- New code in `server.js` that branches on `process.env.JIRA_BASE_URL`
- Real Jira tickets in your inbox if creds are set
- Mock tickets if not

✅ **Done criteria**: open `localhost:3000`, see real tickets if you have creds, mock if you don't. Either works.

---

## Step 3 — Validate at the boundary (5 min)

The lesson: **validate at the boundary, always.** Paste this:

> The Jira fetch above can fail in three ways: missing env vars, network error, malformed Jira response. Add explicit handling for each. On any failure, log the cause and fall back to mock data. Never crash the server.

Reload the inbox. Try unsetting `JIRA_BASE_URL` mid-session and reloading — should keep working.

---

## Step 4 — Three ways tickets find you (5 min, conceptual)

The repo's current pattern is **pull** (your tool asks Jira). The other two:

- **Push** — Zendesk webhook hits an endpoint you expose. Faster but needs your tool reachable.
- **Poll** — background loop checks every 60s. The "boring option" — use it when the system doesn't speak webhooks (most enterprise software).

The shape your UI cares about — `id, subject, body, severity` — never changes. **Build the UI against ONE shape. Let the connector translate.**

---

## What you'll have at 2:00

- Your inbox is fed by Jira (or by mock — equally fine)
- You've seen the parse → call → validate → store pattern in real code
- You understand the three protocols (pull / push / poll) and when to pick each

**Break: 2:00–2:15. Then open `block-3-build-skill.md` — the centerpiece.**
