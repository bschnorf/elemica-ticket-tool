import Anthropic from "@anthropic-ai/sdk";

const TRIAGE_SCHEMA = {
  type: "object",
  properties: {
    ticket_id: { type: "string" },
    category: {
      type: "string",
      enum: [
        "edi-mapping",
        "xcarrier-change",
        "escalation",
        "legacy-deployment",
        "idx-extraction",
        "infra-cloud",
        "sap-request",
        "unknown",
      ],
    },
    severity: {
      type: "string",
      enum: ["low", "medium", "high", "urgent"],
    },
    target_systems: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
    assumptions: { type: "array", items: { type: "string" } },
    unverified: { type: "array", items: { type: "string" } },
  },
  required: [
    "ticket_id",
    "category",
    "severity",
    "target_systems",
    "summary",
    "assumptions",
    "unverified",
  ],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `You are a ticket triage assistant for Elemica's customer support and engineering operations. Given a single ticket, produce a structured triage report.

Categories:
- edi-mapping — EDI/X12/IDoc mapping issues
- xcarrier-change — xCarrier carrier additions, upgrades, integrations
- escalation — P1/P2 customer escalations, SLA breaches
- legacy-deployment — legacy infra issues (WebLogic, on-prem)
- idx-extraction — Intelligent Document Extraction
- infra-cloud — cloud infrastructure, SRE, migrations, admin/platform features
- sap-request — SAP integration BRDs and change requests
- unknown — does not fit any category

Severity:
- low — cosmetic or nice-to-have
- medium — impacts a workflow but has a workaround
- high — blocks a key workflow with no clean workaround
- urgent — production outage, SLA breach, or executive escalation

For each ticket:
- target_systems: specific named systems, modules, mappings, or services affected
- summary: one-sentence problem statement
- assumptions: things you took as given from the ticket text
- unverified: things that would need verification before taking action`;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export async function triage(ticket) {
  if (!client) {
    return {
      todo: true,
      note: "ANTHROPIC_API_KEY not set — returning stub. Add it to .env to enable real triage.",
      ticket_id: ticket.id,
      category: ticket.category || "unknown",
      severity: ticket.severity || "medium",
      target_systems: [],
      summary: ticket.subject,
      assumptions: [],
      unverified: ["everything — this is a stub"],
    };
  }

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: TRIAGE_SCHEMA },
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
        content: `Triage this ticket and respond as JSON conforming to the schema.

ID: ${ticket.id}
Subject: ${ticket.subject}
Reporter: ${ticket.reporter}
Reporter's guessed category: ${ticket.category}
Reporter's guessed severity: ${ticket.severity}

Body:
${ticket.body}`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return JSON.parse(textBlock.text);
}
