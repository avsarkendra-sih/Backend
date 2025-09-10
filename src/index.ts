import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const port:string=process.env.PORT || "3000";

app.listen(3000,()=>{
    console.log(`server is listening at ${port} }`)
})


