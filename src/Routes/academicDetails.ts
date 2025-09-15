import express from "express"
import { createAcademicRecord , getAcademicRecordsByUser , updateAcademicRecordByUser ,deleteAcademicRecordByUser} from "../Controllers/academicDetails.ts"


const router = express.Router()

router.post("/createAR",createAcademicRecord)
router.get("/getAR",getAcademicRecordsByUser)
router.put("/update",updateAcademicRecordByUser)
router.delete("deleteAR",deleteAcademicRecordByUser)






export default router