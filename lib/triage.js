// ╭─ TODO #1 — AI Triage ─────────────────────────────────────────────────╮
// │ This is the workshop centerpiece (Block 3, 2:15–3:00).                │
// │                                                                       │
// │ Goal: replace this stub with a real AI call that classifies a         │
// │ ticket — category, severity, target system, summary, assumptions.    │
// │                                                                       │
// │ Hint: use Claude Code to wire this up. Open a terminal and run:       │
// │                                                                       │
// │   claude "fill in lib/triage.js — call Anthropic's Messages API       │
// │           with the ticket and return JSON matching the shape below.   │
// │           use process.env.ANTHROPIC_API_KEY. add it to .env.example." │
// ╰───────────────────────────────────────────────────────────────────────╯

export async function triage(ticket) {
  // STUB — returns a hard-coded answer so the UI works before you replace it.
  return {
    todo: true,
    note: "This is the AI Triage stub. Wire it up in Block 3 to call Anthropic's API.",
    ticket_id: ticket.id,
    category: ticket.category || "unknown",
    severity: ticket.severity || "medium",
    target_systems: [],
    summary: ticket.subject,
    assumptions: [],
    unverified: ["everything — this is a stub"],
  };
}

// Expected shape after you wire it up:
//
// {
//   ticket_id: "EDI-2147",
//   category: "edi-mapping",
//   severity: "medium",
//   target_systems: ["Elemica Network", "IDoc → 947 X12 reusable map"],
//   summary: "Negative-qty inventory adjustments drop the IT1*ADJ segment...",
//   assumptions: ["BA's reproduction steps are accurate"],
//   unverified: ["Customer's downstream WMS behaviour"]
// }
