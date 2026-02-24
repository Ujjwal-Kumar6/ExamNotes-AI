export const buildPrompt = ({ topic, level, examType, revision, diagram, charts }) => {
  return `You are a strict JSON exam notes generator.

OUTPUT RULES:
- Output ONLY valid JSON. Nothing before or after.
- Double quotes only. No trailing commas. No comments.
- Escape newlines as \\n inside strings.
- No emojis inside text values (text fields only). Markdown bold (**text**) is allowed inside strings.
- LaTeX math is allowed: inline as $formula$, block as $$formula$$.

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
Classify every subtopic into exactly one of three star-rated priority levels:

"⭐⭐⭐" = Core definitions, formulas, highest exam marks — maximum detail
"⭐⭐"   = Supporting concepts, applications, frequently asked — moderate detail  
"⭐"     = Background knowledge, rare topics — brief explanation

Every subtopic MUST appear in one of the three arrays.
Do NOT leave all three arrays empty.
Do NOT rename these keys — use the exact star strings shown above.

========================
SUBTOPIC FORMAT
========================
Each item in ⭐⭐⭐ / ⭐⭐ / ⭐ must be a plain string.
Use **bold** markdown for key terms. Use $formula$ for inline math.
Example: "**Newton's Second Law**: Force equals mass times acceleration, $F = ma$"

========================
REVISION MODE
========================
${revision
  ? "Focus on ⭐⭐⭐ priority only. Keep each string concise (1–2 sentences). Quick recall style."
  : "Balanced coverage across all three priorities. Include examples and detailed explanations in each string."}

========================
DIAGRAM RULES
========================
${diagram
  ? `Include a valid Mermaid diagram inside diagram.data for the most important concept.
Use only simple Mermaid syntax: flowchart LR/TD, graph, or sequenceDiagram.
Escape all quotes inside diagram strings with \\".
Keep it under 20 nodes.`
  : 'Set diagram.data to empty string "".'}

========================
CHART RULES
========================
${charts
  ? `Include 1–2 markdown pipe tables inside the chart array as strings.
Max 10 rows each. First column is the category label. Remaining columns are numeric.
Only for ⭐⭐⭐ or ⭐⭐ topics.
Example row: "| Concept | Score | Frequency |\\n|---------|-------|-----------|\\n| Item A  | 80    | 12        |"`
  : "Set chart to empty array []."}

========================
EXACT OUTPUT STRUCTURE
========================
{
  "subTopics": {
    "⭐⭐⭐": ["string", "string"],
    "⭐⭐":   ["string", "string"],
    "⭐":     ["string"]
  },
  "importance": "⭐⭐⭐ | ⭐⭐ | ⭐",
  "note": "string",
  "revisonPoint": ["string", "string"],
  "question": {
    "short": ["string", "string"],
    "long":  ["string"]
  },
  "diagram": {
    "type": "flowchart | sequence | graph",
    "data": "string"
  },
  "chart": ["string"]
}

IMPORTANT KEY NAMES — copy exactly:
- "subTopics"    (camelCase, capital T)
- "revisonPoint" (intentional typo — no 'i' before 'on', match this exactly)
- "question"     (singular)
- "note"         (singular string, not array)

========================
EXAMPLE (follow this structure exactly)
========================
{
  "subTopics": {
    "⭐⭐⭐": [
      "**Newton's Second Law**: $F = ma$ — Force equals mass multiplied by acceleration. Increasing force increases acceleration proportionally.",
      "**Conservation of Energy**: Total energy in a closed system remains constant. $E_k + E_p = \\\\text{constant}$"
    ],
    "⭐⭐": [
      "**Applications of Newton's Laws**: Used in engineering to design bridges, vehicles, and aerospace systems.",
      "**Free Body Diagrams**: Visual tool to resolve all forces acting on an object before applying $F = ma$"
    ],
    "⭐": [
      "**History**: Isaac Newton published the three laws of motion in *Principia Mathematica* (1687)."
    ]
  },
  "importance": "⭐⭐⭐",
  "note": "Focus on **Newton's Second Law** and **energy conservation** — these appear in almost every exam. Memorise the formulas and practice applying them in multi-step problems.",
  "revisonPoint": [
    "**F = ma**: Force (N) = mass (kg) × acceleration (m/s²)",
    "**Conservation of Energy**: $E_k = \\\\frac{1}{2}mv^2$ and $E_p = mgh$",
    "Newton's Third Law: every action has an equal and opposite reaction",
    "A free body diagram resolves all forces before solving"
  ],
  "question": {
    "short": [
      "State Newton's Second Law and write its formula.",
      "What is the SI unit of force and how is it derived?",
      "Distinguish between mass and weight."
    ],
    "long": [
      "A 5 kg block is pushed along a frictionless surface with 20 N. Calculate acceleration and velocity after 4 s. Show all steps.",
      "Explain the principle of conservation of energy with a worked example involving a falling object."
    ]
  },
  "diagram": {
    "type": "flowchart",
    "data": "flowchart TD\\n    A[Apply Force F] --> B{Is surface frictionless?}\\n    B -- Yes --> C[a = F divided by m]\\n    B -- No --> D[a = F minus friction divided by m]\\n    C --> E[Calculate velocity: v = u + at]\\n    D --> E"
  },
  "chart": [
    "| Law | Formula | Key Variable |\\n|-----|---------|-------------|\\n| Newton 1st | No net force | Inertia |\\n| Newton 2nd | $F = ma$ | Acceleration |\\n| Newton 3rd | $F_{AB} = -F_{BA}$ | Reaction |"
  ]
}

Now generate notes for the topic above. Output ONLY valid JSON.`;
};