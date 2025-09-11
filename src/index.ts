import express from "express";
import dotenv from "dotenv";
import personalRouter from "./Routes/personalDetail.ts"
dotenv.config()
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port:string=process.env.PORT || "3000";


app.use("/api",personalRouter)

app.listen(3000,()=>{
    console.log(`server is listening at ${port} }`)
})


