import express from "express"
import { isAuthentication } from "../middleware/isAuthenticated.js"
import { addReview, updateReview } from "../controllers/review.controller.js"

const router=express.Router()

router.post("/addReview",isAuthentication,addReview)
router.post("/updateReview",isAuthentication,updateReview)


export default router