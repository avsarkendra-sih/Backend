import { Router } from "express";
import authController from "../Controllers/auth.controllers.ts";
const router=Router();

router.route("/login").post(authController);

export default router;