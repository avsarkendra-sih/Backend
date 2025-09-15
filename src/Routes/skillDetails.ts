import express from "express"

import { createSkill ,getSkillsByUser , updateSkill , deleteSkill } from "../Controllers/skillDetails.ts"


const router = express.Router()

router.post("/createSD",createSkill)
router.get("/getSD",getSkillsByUser)
router.put("/updateSD",updateSkill)
router.delete("/deleteSD",deleteSkill)







export default router

