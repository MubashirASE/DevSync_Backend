import express from "express"
import { isAuthentication } from "../middleware/isAuthenticated.js"
import { addReview, allCodeReview, allReview, allReviewer, updateReview } from "../controllers/review.controller.js"

const router=express.Router()

router.post("/addReview",isAuthentication,addReview)
router.post("/updateReview",isAuthentication,updateReview)
router.post("/allReview",isAuthentication,allReview)
router.get("/allCodeReview",isAuthentication,allCodeReview)
router.get("/allReviewer",isAuthentication,allReviewer)
router.post("/updateReview",isAuthentication,updateReview)

export default router