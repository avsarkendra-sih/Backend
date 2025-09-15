import express from "express";
import dotenv from "dotenv";

import signupRoutes from "./Routes/signup.routes.ts"
import authRoutes from "./Routes/auth.routes.ts"
import jobOperation from "./Routes/job.routes.ts"
import oauth from "./Routes/oauth.routes.ts"
import mlRoute from "./Routes/ml.routes.ts"

dotenv.config();

const app=express();
app.use(express.json());
app.use("/api/v1/register",signupRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("api/v1/joboperation",jobOperation)
app.use("api/v1/oauth",oauth)
app.use("api/v1/ml",mlRoute)

const port:string=process.env.PORT || "3000";

app.listen(port,()=>{
    console.log(`server is listening at ${port} }`)
})


