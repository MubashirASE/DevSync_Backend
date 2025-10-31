import express from "express"
import { getStandupDate, submitStandup } from "../controllers/standup.controller.js"
import { isAuthentication } from "../middleware/isAuthenticated.js"

const router=express.Router()

router.post("/addStandupData",isAuthentication,submitStandup)
router.get("/date",getStandupDate)


export default router