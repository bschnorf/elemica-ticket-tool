// ╭─ TODO #4 — Draft Customer Reply ──────────────────────────────────────╮
// │ Sloan's rule — AI drafts, human verifies. The reply must include a    │
// │ verify gate the human signs before anything is sent.                 │
// │                                                                       │
// │ Goal: produce a customer-facing draft + an internal-notes block, AND  │
// │ a verify gate with explicit checkboxes.                              │
// │                                                                       │
// │ The verify gate is non-negotiable — never remove it, even after the   │
// │ rest is wired up. This is how 8/11 of the team's accuracy concern     │
// │ gets answered.                                                       │
// ╰───────────────────────────────────────────────────────────────────────╯

export async function draftReply(ticket) {
  return {
    todo: true,
    note: "Draft Reply stub. Wire it up to produce a customer-facing reply + verify gate.",
    ticket_id: ticket.id,
    customer_facing: `Hi <customer>,\n\n[NEEDS HUMAN INPUT: stub.]\n\nThanks,\n<your name>`,
    internal_notes: "[NEEDS HUMAN INPUT: stub.]",
    verify_gate: [
      "Customer name and contact correct",
      "No internal system names or jargon",
      "Owners and dates are real (not placeholders)",
      "No commitment we can't keep",
      "Workaround tested or labelled untested",
      "No PII or other-customer references",
    ],
  };
}
