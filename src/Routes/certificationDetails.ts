import express from "express"

import { createCertification , getCertificationsByUser , updateCertification , deleteCertification } from "../Controllers/certificationDetails.ts"


const router = express.Router()

router.post("/createCD",createCertification)
router.get("/getCD",getCertificationsByUser)
router.put("/updateCD",updateCertification)
router.delete("/deleteCD",deleteCertification)
export default router