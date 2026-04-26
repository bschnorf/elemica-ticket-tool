# Block 1 · Connect — your code to GitHub

**Time**: 0:30–1:15 (45 min)
**Capability**: Connect (part 1 of 2)
**What done looks like**: a branch on YOUR fork with a small UI change, pushed to GitHub.
**Owner**: you. **Stuck?** raise 🙋 in Zoom chat — Trenton + Sloan check every minute.

---

## Pre-check (30 seconds)

```bash
cd elemica-ticket-tool
git remote -v
# Expected: origin pointing to YOUR fork (not Yuvalkesh/elemica-ticket-tool)
```

If `origin` points to `Yuvalkesh/elemica-ticket-tool` — you cloned the original instead of forking. Fix:
1. Fork it: <https://github.com/Yuvalkesh/elemica-ticket-tool/fork>
2. `git remote set-url origin https://github.com/<your-username>/elemica-ticket-tool.git`

---

## Step 1 — Branch + edit + commit (10 min)

Open Claude Code in the repo:
```bash
claude /init
```

Then ask Claude (paste this verbatim, replacing `<your-name>`):

> Create a branch called `try/<your-name>`. In `public/index.html`, change the page header `<div class="brand-name">` so it reads `<your-name>'s Tickets` instead of `Elemica Ticket Tool`. Commit with a clear message. Push to my fork.

You should see:
- A new branch on GitHub at `https://github.com/<your-username>/elemica-ticket-tool/tree/try/<your-name>`
- Reload `localhost:3000` — your name in the header

✅ **Done criteria**: your name shows in the browser tab header, AND the branch is visible on GitHub.

---

## Step 2 — Code review with Claude (10 min)

Stage some pretend changes and have Claude review them. Try this:

> Open `lib/triage.js`, change the stub's `note` field to "Triage v2 — wired up", stage the change with git, but DON'T commit yet. Then review the staged diff like a senior engineer. Flag anything that could break downstream. I want to see the review before I commit.

Watch what Claude finds. The lesson: **name the constraints up front**, get it to show its work, then you decide.

---

## Step 3 — PR description from a ticket (5 min)

> Draft a PR description for the branch `try/<my-name>`. Use the most recent commit. Include a "What I'm uncertain about" section. No marketing language. Output as markdown.

Copy the result. You'll use this exact pattern in real work — turning a Jira ticket into a PR body.

---

## Common gotchas

- **Auth loop?** `claude /logout` then start fresh.
- **Big repo warning?** This repo is small — you won't hit this. In real work: `claude --cwd ./services/edi`.
- **`.gitignore` drift?** Don't put credentials in any file Claude can read.

---

## What you'll have at 1:15

- Your fork has a `try/<your-name>` branch
- The inbox at `localhost:3000` shows your custom header
- You've seen Claude review code, write a PR body, and commit — all in plain English

**Block 2 starts at 1:15. Open `block-2-connect-jira.md`.**
