import { Review } from "../models/codeReview.model.js";

export const addReview=async(req,res)=>{
 try {
        const {developerName,prLink,reviewer}=req.body
    
    console.log(developerName,prLink,reviewer)

    await Review.create({
         developerName,
         prLink,
         reviewer
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
export const updateReview =async(req,res)=>{

        const { status, isDone} = req.body;
        const user=req.userId
        

        const result = await Review.updateMany({status, isDone});
        console.log(result)
            // res.status(200).json({
            //     message: `${result.matchedCount} documents matched, ${result.modifiedCount} documents modified.`,
            //     result,
            // });

}