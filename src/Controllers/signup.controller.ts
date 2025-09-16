import type { Request, Response} from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { prisma } from "../config/db.ts";
import { ApiError } from "../utils/apiError.ts";
import bcrypt from "bcrypt";
interface SignupBody {
      name: string;
      email: string;
      password: string;
      dateOfBirth:string;
}

const signController=asyncHandler(async (req:Request,res:Response)=>{
   try {
     const user_data:SignupBody=req.body;
     console.log(user_data);
     
      if ([user_data.name, user_data.email, user_data.password, user_data.dateOfBirth].some((field) => field?.trim() === "")) {
         throw new ApiError(400, "All fields are required");
     } 
     const existedUser = await prisma.user.findUnique({
     where: {
        email:user_data.email
     }
 });
     if(existedUser){
         throw new ApiError(300,"email already registered");
     }
     const hashedpassword:string=await bcrypt.hash(user_data.password,10);
     const user = await prisma.user.create({
     data: {
        name:user_data.name,
         email:user_data.email,
         password:hashedpassword,
          dateOfBirth: new Date(user_data.dateOfBirth)
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