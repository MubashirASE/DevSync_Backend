import express from "express"
import { isAuthentication } from "../middleware/isAuthenticated.js"
import { addReview, allCodeReview, allReview, updateReview } from "../controllers/review.controller.js"

const router=express.Router()

router.post("/addReview",isAuthentication,addReview)
router.post("/updateReview",isAuthentication,updateReview)
router.post("/allReview",isAuthentication,allReview)
router.get("/allCodeReview",isAuthentication,allCodeReview)


export default router