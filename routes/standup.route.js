import express from "express"
import { getAllStandupData, getStandupDate, submitStandup } from "../controllers/standup.controller.js"
import { isAuthentication } from "../middleware/isAuthenticated.js"

const router=express.Router()

router.post("/addStandup",isAuthentication,submitStandup)
router.get("/date",isAuthentication,getStandupDate)
router.get("/allData",isAuthentication,getAllStandupData)


export default router