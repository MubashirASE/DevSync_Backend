import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["employee","admin"],
        default:'student'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    lastActive:{
        type:Date,
        default:Date.now
    },
    
     socketId:{
        type:String,
        default:""
     }
    

},{timestamps:true});

export const User = mongoose.model("User", userSchema);