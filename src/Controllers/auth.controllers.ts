import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { prisma } from "../config/db.ts";
import { ApiError } from "../utils/apiError.ts";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();


interface loginSchema{
    email:string,
    password:string
}
const authController=asyncHandler(async (req:Request<{}, {}, loginSchema>,res:Response)=>{
    const {email,password}=req.body;
    const user= await prisma.user.findUnique({
        where: {
        email
    }
});
    if(!user){
        throw new ApiError(404,"User isn't registered");
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password!);
    if(!isPasswordCorrect){
        throw new ApiError(414,"Incorrect password entered");
    }
    return res.status(201).json({
        success:true,
        message: "user registered succesfully"
    })
});
export default authController;
