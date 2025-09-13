import express from "express";
import dotenv from "dotenv";

import signupRoutes from "./Routes/signup.routes.js"
import authRoutes from "./Routes/auth.routes.js"
import jobOperation from "./Routes/job.routes.js"
import oauth from "./Routes/oauth.routes.js"

dotenv.config();

const app=express();
app.use(express.json());
app.use("/api/v1/register",signupRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("api/v1/joboperation",jobOperation)
app.use("api/v1/oauth",oauth)

const port:string=process.env.PORT || "3000";

app.listen(port,()=>{
    console.log(`server is listening at ${port} }`)
})


