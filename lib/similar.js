// ╭─ TODO #3 — Find Similar Past Tickets ─────────────────────────────────╮
// │ Universal — touches Aman, Jeya, Trenton, Sarita's queues.             │
// │                                                                       │
// │ Goal: given a ticket, return up to 5 similar past tickets ordered by  │
// │ relevance with a short reason for each match.                        │
// │                                                                       │
// │ Hint: simplest version — keyword overlap on category + body. Better   │
// │ version — embed each ticket and use cosine similarity. Best version   │
// │ — let Claude rank candidates and explain its reasoning.              │
// ╰───────────────────────────────────────────────────────────────────────╯

export async function findSimilar(ticket, allTickets) {
  // Naïve baseline: exact category match, excluding self.
  const baseline = allTickets
    .filter((t) => t.id !== ticket.id && t.category === ticket.category)
    .slice(0, 5)
    .map((t) => ({ id: t.id, subject: t.subject, reason: `same category: ${t.category}` }));

  return {
    todo: true,
    note: "Find Similar stub — currently does category-match only. Wire up an embedding or LLM-based ranker for real relevance.",
    ticket_id: ticket.id,
    matches: baseline,
  };
}
