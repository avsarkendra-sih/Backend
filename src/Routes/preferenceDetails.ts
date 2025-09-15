import express from "express"

import { createPreference , getPreferenceByUser , updatePreference , deletePreference } from "../Controllers/preferenceDetails.ts"


const router = express.Router()

router.post("/createPref",createPreference)
router.get("/getPref",getPreferenceByUser)
router.put("/updatePref",updatePreference)
router.delete("/deletePref",deletePreference)







export default router