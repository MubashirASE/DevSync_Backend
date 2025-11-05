import express from "express"
import { isAuthentication } from "../middleware/isAuthenticated.js"
import { createQuickLink, deleteQuickLink, getIDQuickLink, getQuickLink, updateQuickLink } from "../controllers/quickLink.controller.js"

const router=express.Router()

router.post("/create",isAuthentication,createQuickLink)
router.patch("/update/:id",isAuthentication,updateQuickLink)
router.get("/get/:id",isAuthentication,getIDQuickLink)
router.get("/getData",isAuthentication,getQuickLink)
router.delete("/delete/:id",isAuthentication,deleteQuickLink)

export default router