# Live Prompts Cheat Sheet

Every big prompt Yuval uses live during the workshop, ready to paste. **Open this file mid-workshop, copy, paste.**

---

## Block 1 — Connect: GitHub

### Personalize the inbox header
```
Create a branch called try/<your-name>. In public/index.html, change the page header <div class="brand-name"> so it reads "<your-name>'s Tickets" instead of "Elemica Ticket Tool". Commit with a clear message. Push to my fork.
```

### Code review with Claude
```
Open lib/triage.js, change the stub's note field to "Triage v2 — wired up", stage the change with git, but DON'T commit yet. Then review the staged diff like a senior engineer. Flag anything that could break downstream. I want to see the review before I commit.
```

### PR description from a ticket
```
Draft a PR description for the branch try/<my-name>. Use the most recent commit. Include a "What I'm uncertain about" section. No marketing language. Output as markdown.
```

---

## Block 2 — Connect: Jira

### Wire `/api/tickets` to Jira REST
```
In server.js, the GET /api/tickets handler currently reads from data/tickets.json. Add a second mode: when env var JIRA_BASE_URL is set, fetch from Jira's /rest/api/3/search?jql=project=EDI&maxResults=20 instead. Map Jira's response into our ticket shape (id, subject, body, category, severity, reporter, created). Keep the JSON file path as a fallback so the app still runs without creds. Test by restarting the server.
```

### Validate at the boundary
```
The Jira fetch above can fail in three ways: missing env vars, network error, malformed Jira response. Add explicit handling for each. On any failure, log the cause and fall back to mock data. Never crash the server.
```

---

## Block 3 — Build: AI Triage skill

### Wire AI Triage to Anthropic's API (centerpiece)
```
Open lib/triage.js. Replace the stub with a real call to Anthropic's Messages API. Use process.env.ANTHROPIC_API_KEY. The system prompt must instruct the model to classify the ticket into one of these categories: edi-mapping, xcarrier-change, sap-request, escalation, legacy-deployment, idx-extraction, infra-cloud, unknown. Severity: low | medium | high | urgent. Return JSON matching the exact shape in the comment block. If the API key is missing, return the original stub with a note. Use the SDK @anthropic-ai/sdk.
```

### Wire the second TODO — PR Form (Lokesh / Vaibhav)
```
Open lib/pr-form.js. Replace the stub with a real call to Anthropic's Messages API. The system prompt must produce a PR-to-SOW form with sections: Scope (in/out), Approach, Bottom-up effort estimate (5 phases — discovery, build, test, deploy, support), Dependencies & risks. Return an object with markdown field. Same env var, same SDK as triage.js.
```

### Wire the second TODO — Find Similar (Aman / Jeya / Trenton)
```
Open lib/similar.js. Replace the naïve category-match with an LLM-based ranker. Pass the current ticket and all other tickets to Anthropic's Messages API and ask it to return the top 5 most similar with a one-sentence reason for each. Return matches as an array of {id, subject, reason}. Same env var, same SDK as triage.js.
```

### Wire the second TODO — Draft Reply (Sirish / Malay)
```
Open lib/reply.js. Replace the stub with a real call to Anthropic's Messages API. Produce two outputs: customer_facing (a polite, jargon-free reply) and internal_notes (frank engineering notes). Both based on the ticket. Keep the verify_gate array exactly as is — never remove it. Same env var, same SDK as triage.js.
```

---

## Block 4 — Design + ship

### Suggest small design improvements
```
The current submit form is functional. Suggest 3 small design improvements that would make it feel more polished — but only ones that take less than 2 minutes each. No new dependencies.
```

### Render deploy verification
```
Walk me through the deployment in the Render dashboard. The service should auto-deploy from main. Confirm: build logs show npm install + npm start, the URL responds with the inbox HTML, and ANTHROPIC_API_KEY is set in env vars.
```

---

## Emergency / unstuck prompts

### Server won't start
```
The server fails to start with this error: <paste error>. What's the cause and how do I fix it without changing my AI integration?
```

### AI Triage returns the stub when I expect live
```
I wired Anthropic to lib/triage.js but clicking the AI Triage button still returns todo:true. Check: did I restart the server? Is ANTHROPIC_API_KEY set in .env and loaded? Is the SDK actually called? Walk through diagnostics in order.
```

### Render deploy fails
```
My Render deploy is failing with: <paste error>. Common causes: missing env vars, Node version mismatch, bad start command. Check render.yaml and tell me which one is wrong.
```

### I broke something — roll back
```
I want to undo my last commit but keep my changes in the working directory. Show me the exact git command.
```

---

**Pro tip**: when a prompt doesn't work, look at the comment block at the top of the file you're editing. **That's the contract.** Sharpen the prompt to match the contract more precisely.
