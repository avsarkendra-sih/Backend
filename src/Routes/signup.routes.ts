import { Router } from "express";
import signController from "../Controllers/signup.controller.js";
import signMiddleware from "../middlewares/signup.middlewares.js"

const router=Router();
router.post("/signup",signMiddleware,signController);

export default router;