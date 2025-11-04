import { generateToken } from "../middleware/generateToken.js";
import {User} from "../models/user.model.js"

import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userData = await User.findOne({ email });

    // ✅ First check if email exists
    if (userData) {
      if (userData.name === name) {
        return res.json({
          success: false,
          message: "Name already exists!",
        });
      }

      return res.json({
        success: false,
        message: "Email already exists!",
      });
    }

    // ✅ Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    // ✅ Generate token with new user data
    return generateToken(res, newUser, `Welcome ${newUser.name}`);

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Registration failed!",
    });
  }
};
 
export const Login =async(req,res)=>{
    try {
    console.log(req.body)
    const {email,password}=req.body
    console.log(email)
    const data =await User.findOne({email})
    if(!data){
        res.json({
            success: false,
            message:"Invalid Email!"

        })
    }

    const isPassword = await bcrypt.compare(password,data.password);
    console.log(isPassword)
        if(!isPassword){
            res.json({
                success:false,
                message:"Incorrect Password!"
            });
        }
   
    return generateToken(res,data ,`Welcome back ${data.name}`);

    
    } catch (error) {
     console.log(error)
     res.json({
        success:false,
        message:"Registration failed!"
     })   
    }
} 
export const getAllUserData= async (req, res) => {
  try {

    const userData= await User.find({role:{$ne:"admin"}}).select("-password");
    console.log(userData)
    return res.json({
      success: true,
      data: userData
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "User Data failed!"
    });
  }
};
