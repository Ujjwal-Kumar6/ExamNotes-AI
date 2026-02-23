import notesModle from "../modle/notesModle.js";
import mongoose from "mongoose"

 

export const getNotes = async(req , res)=>{
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({message:"UserId not found You have to login fast"});
        }
        const notes = await notesModle.find({
            user: userId
        });

        if (!notes) {
            return res.status(201).json({message:"You are not creating any page"});
        }

        return res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`GetNotes Error :- ${error}`});
    }
}  


export const currentNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    if (!noteId) {
      return res.status(400).json({ message: "NoteId not found" });
    }

    // 🔹 IMPORTANT FIX
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const note = await notesModle.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `CurrentNotes Error :- ${error.message}`
    });
  }
};
