import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
     },
    credits: {
        type: Number,
        default: 20,
        min: 0
    },
    isCredits: {
        type: Boolean,
        default: true
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Notes",
        default: []
    }
}, { timestamps: true })

const userModle = mongoose.model("User", userSchema);

export default userModle;