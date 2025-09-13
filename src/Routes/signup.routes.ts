import { Router } from "express";
import signController from "../Controllers/signup.controller.ts";
import signMiddleware from "../middlewares/signup.middlewares.ts"

const router=Router();
router.post("/signup",signMiddleware,signController);

export default router;