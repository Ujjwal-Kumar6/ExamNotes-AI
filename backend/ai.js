const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const response = async (prompt) => {
    try {
        const res = await fetch(
            `${url}?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                }),
            }
        );

        const data = await res.json();
        const text = data.candidates[0].content.parts[0].text;
        if (!text) {
            throw new Error("No text found from Your ai modle");
        }

        const clearText = text
            .replace(/'''json/g, "")
            .replace(/'''/g, "")
            .trim();

        return JSON.parse(clearText);
    } catch (error) {
        console.error("Error:", error);
        return "Something went wrong";
    }
};