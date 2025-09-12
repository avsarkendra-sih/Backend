import express from "express"

import { createProject , getProjectsByUser , updateProject , deleteProject } from "../Controllers/projectDetails.ts"


const router = express.Router()

router.post("/createPRD",createProject)
router.get("/getPRD",getProjectsByUser)
router.put("/updatePRD",updateProject)
router.delete("/deletePRD",deleteProject)







export default router


