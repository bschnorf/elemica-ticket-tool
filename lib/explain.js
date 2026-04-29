import Anthropic from "@anthropic-ai/sdk";

const EXPLAIN_SCHEMA = {
  type: "object",
  properties: {
    ticket_id: { type: "string" },
    headline: { type: "string" },
    explanation: { type: "string" },
  },
  required: ["ticket_id", "headline", "explanation"],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `You translate engineering and customer-support tickets into plain English for non-technical readers — product managers, account managers, executives, customer-success leads.

For each ticket, produce:
- headline: one sentence, no jargon, that tells a non-technical reader what's going on at a glance.
- explanation: one to three short paragraphs in plain English. Decode any technical terms inline the first time they appear. For example, instead of "the IDoc-to-947 X12 path is dropping the IT1*ADJ segment", write "the system that converts SAP's internal inventory messages into the standard format we share with our customers (the '947') is leaving out a small but important field that records inventory adjustments." Avoid jargon, acronyms, code, and numbered or bulleted lists — write flowing prose. Do not include status updates, severity, or next-step plans unless the ticket text itself frames them.

The audience cares about: what is happening, who it affects, and why it matters in business terms. They do not care about the specific technologies involved unless those technologies are essential to understanding the problem.`;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export async function explain(ticket) {
  if (!client) {
    return {
      todo: true,
      note: "ANTHROPIC_API_KEY not set — returning stub. Add it to .env to enable real explanations.",
      ticket_id: ticket.id,
      headline: ticket.subject,
      explanation: "Stub response. Set ANTHROPIC_API_KEY in .env to generate a real plain-English explanation.",
    };
  }

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: EXPLAIN_SCHEMA },
    },
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Explain this ticket in plain English for a non-technical reader. Respond as JSON conforming to the schema.

ID: ${ticket.id}
Subject: ${ticket.subject}
Reporter: ${ticket.reporter}

Body:
${ticket.body}`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return JSON.parse(textBlock.text);
}
