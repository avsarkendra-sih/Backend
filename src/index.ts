import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import signupRoutes from "./Routes/signup.routes.ts";
import authRoutes from "./Routes/auth.routes.ts";
import jobOperation from "./Routes/job.routes.ts";
import oauth from "./Routes/oauth.routes.ts";
import personalRouter from "./Routes/personalDetails.ts";
import academicRouter from "./Routes/academicDetails.ts";
import skillRouter from "./Routes/skillDetails.ts";
import certificationRouter from "./Routes/certificationDetails.ts";
import projectRouter from "./Routes/projectDetails.ts";
import achievementRouter from "./Routes/achievementDetails.ts";
import fileRouter from "./Routes/fileDetails.ts";
import preferenceRouter from "./Routes/personalDetails.ts";
import mlRoute from "./Routes/ml.routes.ts"


dotenv.config();

const port: string = process.env.PORT || "3000";
const app = express();
app.use(express.json());
dotenv.config();

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/register",signupRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/joboperation",jobOperation)
app.use("/api/v1/oauth",oauth)
app.use("/api/v1/ml",mlRoute)

app.use("/api/personal", personalRouter);
app.use("/api/academic", academicRouter);
app.use("api/skill", skillRouter);
app.use("api/certification", certificationRouter);
app.use("/api/project", projectRouter);
app.use("/api/achievement", achievementRouter);
app.use("/api/file", fileRouter);
app.use("api/preference", preferenceRouter);

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
