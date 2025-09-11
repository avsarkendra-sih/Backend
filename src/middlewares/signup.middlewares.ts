import type{ Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js";
export default async function signMiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"]?.split("Bearer ")[1];
    if(!token){
        throw new ApiError(414,"no token found");
    }
   const verification= jwt.verify(token,process.env.JWT_SECRET!)
   if(!verification){
        throw new ApiError(408,"unauthorized access")
   }
   next();
}