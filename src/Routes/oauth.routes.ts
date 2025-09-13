// import { ExpressAuth } from "@auth/express"
// import express from "express"
 
// const app = express()
 
// // If your app is served through a proxy
// // trust the proxy to allow us to read the `X-Forwarded-*` headers
// app.set("trust proxy", true)
// app.use("/auth/*", ExpressAuth({ providers: [] }))
import { Router } from "express";
import signMiddleware from "../middlewares/signup.middlewares.ts";
import oauthcontroller from "../Controllers/oauth.controllers.ts";
const router=Router();

router.post("/google",signMiddleware,oauthcontroller);

export default router;