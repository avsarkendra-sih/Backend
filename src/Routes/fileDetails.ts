import express from "express"

import { createFileUpload , getFileUploadsByUser , updateFileUpload , deleteFileUpload } from "../Controllers/fileDetails.ts"


const router = express.Router()

router.post("/createFD",createFileUpload)
router.get("/getFD",getFileUploadsByUser)
router.put("/updateFD",updateFileUpload)
router.delete("/deleteFD",deleteFileUpload)







export default router