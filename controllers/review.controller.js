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
export const updateReview =async(req,res)=>{

        const { status} = req.body;
        const user=req.userId
        

        const result = await Review.updateMany({status, isDone});
        console.log(result)
            // res.status(200).json({
            //     message: `${result.matchedCount} documents matched, ${result.modifiedCount} documents modified.`,
            //     result,
            // });

}