import { Router } from "express";
import { getMLData } from "../Controllers/mlDataController.ts";
const router=Router()
router.get("/",getMLData)

export default router;

