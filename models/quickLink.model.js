import mongoose from "mongoose";

const quickLinkSchema= new mongoose.Schema({
  
  title: { type: String, required: true },
  description: { type: String, required: true },
  URL: { type: String,required:true },
  category:{type:String,required:true},
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
   }

}, { timestamps: true });


export const Quicklink= mongoose.model("Quicklink", quickLinkSchema);
