import express from "express"
import { SignUp,Login } from "../controllers/user.controller.js"

const router=express.Router()

router.post('/signup',SignUp)
router.post('/login',Login)

export default router