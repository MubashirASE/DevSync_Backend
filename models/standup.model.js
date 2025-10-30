import mongoose from "mongoose";

const standupSchema = new mongoose.Schema({
  
  yesterday: { type: String, required: true },
  today: { type: String, required: true },
  blockers: { type: String },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
   },
   date:{
    type:Date,
    default:Date.now
}

}, { timestamps: true });


export const StandUp= mongoose.model("StandUp", standupSchema);
