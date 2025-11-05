import { Review } from "../models/codeReview.model.js";
import { User } from "../models/user.model.js";

export const addReview=async(req,res)=>{
 try {
    const {developerName,prLink,reviewer}=req.body

    console.log(developerName,prLink,reviewer)

    const createPR=await Review.create({
         developerName,
         prLink,
         reviewer
     })
     return res.json({
         success:true,
         message:"PR Reviewer Request Successfully"
     })
     } catch (error) {
      console.log(error)
      res.json({
         success:false,
         message:"PR Reviewer Request failed!"
      })
     }
}
export const allReview=async(req,res)=>{
 try {
    const {developerName}=req.body
    
    const userData= await Review.find({developerName:{$eq:developerName}})
     return res.json({
      success: true,
      data: userData
    });
     } catch (error) {
      console.log(error)
      res.json({
         success:false,
         message:"PR Reviewer Request failed!"
      })
     }
}

export const allCodeReview=async(req,res)=>{
     try {
      const userId = req.userId; 
      console.log(userId)
      const userName= await User.findOne({_id:userId})
      console.log(userName.name)
      const name=userName.name
      const userData= await Review.find({reviewer:name})
      console.log(userData)
     return res.json({
      success: true,
      data: userData
    });
     } catch (error) {
      console.log(error)
      res.json({
         success:false,
         message:"PR Reviewer Request failed!"
      })
     }
}
export const allReviewer=async(req,res)=>{
     try {
      
      const userData= await Review.find()
      console.log(userData)
     return res.json({
      success: true,
      data: userData
    });
     } catch (error) {
      console.log(error)
      res.json({
         success:false,
         message:"PR Reviewer Request failed!"
      })
     }
}
export const updateReview =async(req,res)=>{
   try{
      const updateData={}
      const userData = req.body;
      console.log(userData)
      if(userData.status){
         updateData.status=userData.status
      }
      if(userData.isDone){
         updateData.isDone=userData.isDone
      }
      console.log(updateData)
      const result = await Review.findByIdAndUpdate(userData.id,{$set:updateData},{new:true});
      console.log("result",result)
      return res.json({
      success: true,
      message:"Status Updated SuccessFully"
    });
     } catch (error) {
      console.log(error)
      res.json({
         success:false,
         message:"PR Reviewer updated failed!"
      })
     }   

}