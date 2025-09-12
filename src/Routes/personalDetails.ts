import express from "express"
import { createPersonalInfo , getPersonalInfoByUser ,updatePersonalInfo , deletePersonalInfo} from "../Controllers/personalDetails.ts"

const router = express.Router()

router.post("/createPI", createPersonalInfo)
router.get("/getPI", getPersonalInfoByUser)
router.put("/updatePI",updatePersonalInfo)
router.delete("/deletePI",deletePersonalInfo)




export default router

