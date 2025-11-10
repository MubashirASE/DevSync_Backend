import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  
  developerName: { type: String, required: true },
  prLink: { type: String, required: true },
   reviewer: [{ type: String, required: true }],
   status:{
    type:String,
    enum:["Pending","in Review","Merge"],
    default:"Pending"
   },
   isDone:{
    type:Boolean,
    default:"false"
   }

}, { timestamps: true });


export const Review= mongoose.model("Review", reviewSchema);
