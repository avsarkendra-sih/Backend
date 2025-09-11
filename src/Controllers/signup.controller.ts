import type { Request, Response, NextFunction, RequestHandler } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../config/db.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcrypt";
interface SignupBody {
      name: string;
      email: string;
      password: string;
      dateOfBirth:string;
}

const signController=asyncHandler(async (req:Request<{}, {}, SignupBody>,res:Response,next:NextFunction)=>{
   try {
     const {name,email,password,dateOfBirth}=req.body;
      if ([name, email, password, dateOfBirth].some((field) => field?.trim() === "")) {
         throw new ApiError(400, "All fields are required");
     } 
     const existedUser = await prisma.user.findUnique({
     where: {
         email
     }
 });
     if(existedUser){
         throw new ApiError(404,"email already registered");
     }
     const hashedpassword:string=await bcrypt.hash(password,10);
     const user = await prisma.user.create({
     data: {
         name,
         email,
         password:hashedpassword,
          dateOfBirth: new Date(dateOfBirth)
     }
 
 });
      return res.status(201).json({
       success: true,
       message: "User registered successfully",
       data: {
         id: user.id,
         name: user.name,
         email: user.email,
         dateOfBirth: user.dateOfBirth,
       },
     });
   } catch (error) {
     throw new ApiError(501,"Internal Server error in signup controller");
   }


})

export default signController;