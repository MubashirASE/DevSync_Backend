import { generateToken } from "../middleware/generateToken.js";
import {User} from "../models/user.model.js"

import bcrypt from "bcryptjs";

export const SignUp =async(req,res)=>{
    try {
        console.log(req.body)
    const {name ,email,password,role}=req.body
    console.log(email)
    const data =await User.findOne({email})
    if(data){
        res.json({
            success: false,
            message:"Already exist email"

        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password:hashPassword,
        role
    })
    return res.json({
        success:true,
        message:"Account Created Successfully"
    })
    } catch (error) {
     console.log(error)
     res.json({
        success:false,
        message:"Registration failed!"
     })   
    }
} 
export const Login =async(req,res)=>{
    try {
    console.log(req.body)
    const {email,password}=req.body
    console.log(email)
    const data =await User.findOne({email})
    if(!data){
        res.json({
            success: false,
            message:"Invalid Email"

        })
    }
     const isPassword = await bcrypt.compare(password, data.password);
        if(!isPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            });
        }

        return generateToken(res, data, `Welcome back ${data.name}`);

    
    } catch (error) {
     console.log(error)
     res.json({
        success:false,
        message:"Registration failed!"
     })   
    }
} 
export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}