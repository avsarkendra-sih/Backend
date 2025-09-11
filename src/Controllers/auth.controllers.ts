import type { Request, Response, NextFunction, RequestHandler } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../config/db.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();


interface loginSchema{
    email:string,
    password:string
}
const authController=asyncHandler(async (req:Request<{}, {}, loginSchema>,res:Response,next:NextFunction)=>{
    const {email,password}=req.body;
    const user= await prisma.user.findUnique({
        where: {
        email
    }
});
    if(!user){
        throw new ApiError(404,"User doesn't registered");
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        throw new ApiError(414,"Incorrect password entered");
    }
    return res.status(201).json({
        success:true,
        message: "user registered succesfully"
    })
});
export default authController;
