// ╭─ TODO #2 — Generate PR Form ──────────────────────────────────────────╮
// │ Hits the PR-to-SOW pipeline that consumes ~20 hrs/week for Lokesh,    │
// │ Vaibhav, and Sirish (per the readiness assessment).                   │
// │                                                                       │
// │ Goal: produce a filled PR form with a bottom-up effort estimate       │
// │ (discovery / build / test / deploy / support).                       │
// │                                                                       │
// │ Hint: feed the ticket into Anthropic's Messages API with a system    │
// │ prompt that includes the templates/pr-form.md shape. Return a         │
// │ markdown string the UI can render or copy.                           │
// ╰───────────────────────────────────────────────────────────────────────╯

export async function generatePrForm(ticket) {
  return {
    todo: true,
    note: "Generate PR Form stub. Wire it up to produce a filled PR-to-SOW form with bottom-up estimate.",
    ticket_id: ticket.id,
    markdown: `# PR Form — ${ticket.id}\n\n[NEEDS HUMAN INPUT: this is a stub. Wire up lib/pr-form.js during the workshop.]`,
  };
}
