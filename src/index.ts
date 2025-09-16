import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
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


dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // must match frontend origin
  // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());


app.use("/api/v1/register", signupRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("api/v1/joboperation", jobOperation);
app.use("api/v1/oauth", oauth);
dotenv.config();

// app.options("*", cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// }));
// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
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


app.get("/", (req, res) => {
  res.json("ha chl rha h");
})