import { buildPrompt } from "../confit/promtMaker.js";
import userModle from "../modle/userModle.js";
import { response } from "../ai.js";
import notesModle from "../modle/notesModle.js";

export const genNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            topic,
            level,
            examType,
            revision = false,
            diagram = false,
            charts = false
        } = req.body;
        if (!topic || !level || !examType) {
            return res.status(401).josn({ message: 'Topic Class/Lable and ExamType all are the required data' });
        }
        const user = await userModle.findById(userId);

        if (!user) {
            return res.status(402).josn({ message: "Plise login fast to get best not in eagest way" });
        }

        if (user.credits < 5) {
            user.isCredits = false;
            await user.save();
            return res.status(403).josn({ message: 'InSuffecent amout of dimond Plise Top-Up Fast' });
        }

        const prompt = buildPrompt({
            topic,
            level,
            examType,
            revision,
            diagram,
            charts,
        });

        const aires = await response(prompt);

        const notes = await notesModle.create({
            user:userId,
            topic,
            level,
            revision,
            diagram,
            charts,
            content:aires,
        });

        user.credits -= 5;
        if (user.credits < 5) {
            user.isCredits = false;
        }

        if (!Array.isArray(user.notes)) {
            user.notes = [];
        }

        user.notes.push(notes._id);

        await user.save();

        return res.status(200).json({
            data: aires,
            notesId: notes._id,
            creaditsLeft : user.credits
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`GenNotes Error :- ${error}`});
    }
}