import { Quicklink } from "../models/quickLink.model.js"


export const createQuickLink=async(req,res)=>{
    try {
        const userId=req.userId
        const {title,description,URL,category}=req.body
        console.log(title,description,URL,category,userId)
        if(!title || !description || !URL || !category){
            return res.json({
                success:"false",
                message:"All Field is Requried!"
            })
        }
        await Quicklink.create({
            title,
            description,
            URL,
            category,
            userId
        })
        return res.json({
            success:"true",
            message:"Created Successfully"
        })
    } catch (error) {
        return res.json({
            success:"false",
            message:"Created Failed!"
        })
    }
}
export const updateQuickLink=async(req,res)=>{
    try {
        const id=req.params.id
        const updateField={}
        for (const key in req.body) {
      if (req.body[key] !== null && req.body[key] !== undefined) {
        updateField[key] = req.body[key];
      }
    }
        const result=await Quicklink.findByIdAndUpdate(id,{$set:updateField},{new:true})
        console.log(result)
        return res.json({
            success:"true",
            message:"Update Successfully",
            result
        })
    } catch (error) {
        return res.json({
            success:"false",
            message:"Created Failed!"
        })
    }
}
export const getIDQuickLink=async(req,res)=>{
    try {
        const id=req.params.id
     
        const result=await Quicklink.findById(id)
        console.log(result)
        return res.json({
            success:"true",
            message:"Fetch Data Successfully",
            result
        })
    } catch (error) {
        return res.json({
            success:"false",
            message:"Created Failed!"
        })
    }
}
export const getQuickLink=async(req,res)=>{
    try {
        const Id=req.userId
        console.log("getID",Id)
        const result=await Quicklink.find({userId:Id})
        console.log("allresult",result)
        return res.json({
            success:"true",
            message:"Fetch Data Successfully",
            result
        })
    } catch (error) {
        return res.json({
            success:"false",
            message:"Created Failed!"
        })
    }
}
export const deleteQuickLink=async(req,res)=>{
    try {
        const id=req.params.id
        console.log(id)
        await Quicklink.findByIdAndDelete(id)
        return res.json({
            success:"true",
            message:"Deleted Data Successfully",
        })
    } catch (error) {
        return res.json({
            success:"false",
            message:"Created Failed!"
        })
    }
}
