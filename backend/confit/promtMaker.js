export const buildPrompt = ({ topic, level, examType, revision, diagram, charts }) => {
  return `You are a strict JSON exam notes generator.

OUTPUT RULES:
- Output ONLY valid JSON. Nothing before or after.
- Double quotes only. No trailing commas. No comments.
- Escape newlines as \\n inside strings.
- No emojis inside text values. Markdown allowed inside strings.

========================
TASK
========================
Topic: ${topic}
Level: ${level || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revision ? "ON" : "OFF"}
Include Diagram: ${diagram ? "YES" : "NO"}
Include Charts: ${charts ? "YES" : "NO"}

========================
PRIORITY SYSTEM
========================
Classify every subtopic into exactly one of these three priority levels:

"low"    = Background knowledge, rare topics, brief explanation (1 star)
"medium" = Supporting concepts, applications, frequently asked (2 stars)
"high"   = Core definitions, formulas, highest marks, maximum detail (3 stars)

Every subtopic MUST appear in one of the three arrays: low, medium, or high.
Do NOT leave all three arrays empty.
Do NOT rename these keys.

========================
SUBTOPIC FORMAT
========================
Each item in low/medium/high must follow this exact shape:
{
  "title": "string",
  "bullets": ["string", "string"],
  "example": "string or empty string"
}

========================
REVISION MODE
========================
${revision
  ? "Focus on high priority only. Keep bullets concise (2-3 per item). Quick recall style."
  : "Balanced coverage across all priorities. Include examples and detailed explanations."}

========================
DIAGRAM RULES
========================
${diagram
  ? 'Include an ASCII or Mermaid diagram inside diagram.data for the most important concept. Keep it simple.'
  : 'Set diagram.data to empty string "".'}

========================
CHART RULES
========================
${charts
  ? 'Include 1-2 markdown tables inside the chart array as strings. Max 10 rows. Only for high/medium topics.'
  : 'Set chart to empty array [].'}

========================
EXACT OUTPUT STRUCTURE
========================
{
  "subTopics": {
    "low": [],
    "medium": [],
    "high": []
  },
  "importance": "low | medium | high",
  "note": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart | table | diagram",
    "data": ""
  },
  "chart": []
}

========================
EXAMPLE (follow this structure exactly)
========================
{
  "subTopics": {
    "low": [
      {
        "title": "History of the topic",
        "bullets": ["Originated in the 19th century", "Developed by multiple scientists"],
        "example": ""
      }
    ],
    "medium": [
      {
        "title": "Applications",
        "bullets": ["Used in industry for X", "Applied in medicine for Y"],
        "example": "Example: using X in solar panels"
      }
    ],
    "high": [
      {
        "title": "Core Definition",
        "bullets": ["**Definition**: The process of...", "**Formula**: E = mc^2"],
        "example": "Example: when a ball falls..."
      }
    ]
  },
  "importance": "high",
  "note": "Focus on definitions and formulas for the exam.",
  "revisionPoints": ["Key point 1", "Key point 2"],
  "questions": {
    "short": ["What is X?", "Define Y."],
    "long": ["Explain the process of X with examples."],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart",
    "data": ""
  },
  "chart": []
}

Now generate notes for the topic above. Output ONLY valid JSON.`;
};