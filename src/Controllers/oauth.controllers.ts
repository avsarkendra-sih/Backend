import type{ Request, Response } from "express";
import { prisma } from "../config/db.ts";

export default async function oauthcontroller(req:Request,res:Response) {
    const {name,email}=req.body();
    await prisma.user.create({
        data:{
            name,
            email
        }
    })
    res.status(201)
       .json({
        message:"user loged in succesfully"
       })
}