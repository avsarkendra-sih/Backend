import { Router } from "express";
import authController from "../Controllers/auth.controllers.js";
const router=Router();

router.route("/login").post(authController);

export default router;