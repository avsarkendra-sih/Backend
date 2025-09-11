import express from "express"
import { createPersonalInfo } from "../Controllers/personalDetails.js"

const router = express.Router()

router.post("/personal-info", createPersonalInfo)




export default router

