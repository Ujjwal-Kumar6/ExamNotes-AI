export const buildPrompt = ({
  topic,
  level,
  examType,
  revision,
  diagram,
  charts
}) => {
  return `You are an ADVANCED EXAM NOTES STRICT JSON GENERATOR.

========================
ABSOLUTE OUTPUT RULES
========================
- Output MUST be ONLY valid JSON
- Do NOT write any text before or after JSON
- JSON will be parsed using JSON.parse()
- INVALID JSON = SYSTEM FAILURE
- Use ONLY double quotes "
- NO comments
- NO trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values
- Markdown allowed ONLY inside string values
- Diagrams and charts must be inside strings
- Never explain outside JSON

========================
TASK
========================
Convert the topic into exam-focused structured notes.

Topic: ${topic}
Class Level: ${level || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revision ? "ON" : "OFF"}
Include Diagram: ${diagram ? "YES" : "NO"}
Include Charts: ${charts ? "YES" : "NO"}

========================
PRIORITY SYSTEM
========================
⭐⭐⭐ = MOST IMPORTANT  
- Core concepts
- Definitions & formulas
- Appears in most exams
- Highest marks
- Maximum detail

⭐⭐ = IMPORTANT  
- Supporting concepts
- Applications
- Frequently asked
- Moderate detail

⭐ = SUPPLEMENTARY  
- Background knowledge
- Rare topics
- Brief explanation

Every subtopic MUST be placed into ⭐ / ⭐⭐ / ⭐⭐⭐ arrays ONLY.

========================
CONTENT RULES
========================
- Clear exam-oriented language
- Short bullet style sentences
- Highlight key terms using **bold**
- No long paragraphs
- High-yield information only
- Suitable for ${level}
- Match ${examType} pattern

========================
REVISION MODE LOGIC
========================
${revision ? `
- Focus heavily on ⭐⭐⭐
- Minimize ⭐
- Very concise notes
- Quick recall style
- 2-3 bullets per point
` : `
- Balanced coverage
- Detailed explanations
- Include examples
`}

========================
DIAGRAM RULES
========================
${diagram ? `
- ASCII or Mermaid allowed
- Only for ⭐⭐⭐ or ⭐⭐
- Keep simple and exam relevant
- Must be placed ONLY inside "diagram.data"
` : `
- "diagram.data" must be empty string
`}

========================
CHART RULES
========================
${charts ? `
- Markdown tables / bar / pie allowed
- Max 10 rows
- Only ⭐⭐⭐ or ⭐⭐ topics
- Must be inside "chart" array as strings
` : `
- "chart" must be empty array
`}

=====================================
REQUIRED JSON STRUCTURE (DO NOT CHANGE)
=====================================
{
   "subTopics"{
       "⭐" : [],
       "⭐⭐" : [],
       "⭐⭐⭐" : [],
   },
   "importance" : "⭐ | ⭐⭐ | ⭐⭐⭐"
   "note" : "string"
   "revisonPoint": [],
   "question" : {
        "short" : [],
        "long" : [],
        "diagram" : ""
   }
    "diagram" : {
        type : "flowchart | table | diagram",
        data : ""
    }
    "chart":[]
}

========================
QUALITY CHECK BEFORE OUTPUT
========================
✓ JSON valid
✓ No trailing commas
✓ No text outside JSON
✓ All subtopics categorized
✓ ⭐⭐⭐ most detailed
✓ Diagram/chart rules followed
✓ Suitable for ${level}
✓ Exam focused for ${examType}

Generate NOW in STRICT JSON ONLY.`;
};