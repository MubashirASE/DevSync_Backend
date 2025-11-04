import express from "express"
import { SignUp,Login, getAllUserData } from "../controllers/user.controller.js"

const router=express.Router()

router.post('/signup',SignUp)
router.post('/login',Login)
router.get('/allUserData',getAllUserData)
export default router