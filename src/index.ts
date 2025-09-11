import express from "express";
import dotenv from "dotenv";

import signupRoutes from "./Routes/signup.routes.js"
import authRoutes from "./Routes/auth.routes.js"
dotenv.config();

const app=express();
app.use(express.json());
app.use("/api/v1/register",signupRoutes);
app.use("/api/v1/auth",authRoutes);
const port:string=process.env.PORT || "3000";

app.listen(port,()=>{
    console.log(`server is listening at ${port} }`)
})


