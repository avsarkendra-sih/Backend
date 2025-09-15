import express from "express";
import dotenv from "dotenv";
import personalRouter from "./Routes/personalDetails.ts"
import academicRouter from "./Routes/academicDetails.ts"
import skillRouter from "./Routes/skillDetails.ts"
import certificationRouter from "./Routes/certificationDetails.ts"
import projectRouter from "./Routes/projectDetails.ts"
import achievementRouter from "./Routes/achievementDetails.ts"
import fileRouter from "./Routes/fileDetails.ts"
import preferenceRouter from "./Routes/personalDetails.ts"
dotenv.config()
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port:string=process.env.PORT || "3000";
app.use("/api/personal",personalRouter)
app.use("/api/academic",academicRouter)
app.use("api/skill",skillRouter)
app.use("api/certification",certificationRouter)
app.use("/api/project",projectRouter)
app.use("/api/achievement",achievementRouter)
app.use("/api/file",fileRouter)
app.use("api/preference",preferenceRouter)

app.listen(3000,()=>{
    console.log(`server is listening at ${port} }`)
})




