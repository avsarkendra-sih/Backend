import express from "express"

import { createAchievement , getAchievementsByUser , updateAchievement , deleteAchievement } from "../Controllers/achievementDetails.ts"


const router = express.Router()

router.post("/createAAD",createAchievement)
router.get("/getAAD",getAchievementsByUser)
router.put("/updateAAD",updateAchievement)
router.delete("/deleteAAD",deleteAchievement)







export default router
