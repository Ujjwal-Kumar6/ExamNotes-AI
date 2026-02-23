import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    level: String,
    examType: String,

    revision: {
        type: Boolean,
        default: false
    },

    diagram: Boolean,
    charts: Boolean,

    content: {
        type: mongoose.Schema.Types.Mixed, //AI response it may be string or json
        required: true
    }
},{timestamps:true})

const notesModle = mongoose.model("Notes", notesSchema);

export default notesModle;