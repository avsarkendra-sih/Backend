import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// jaldi se personal info kar de 
export const createPersonalInfo = async (req: Request, res: Response) => {
  try {
    const user  = await prisma.user.findFirst({
      where :{
        name : req.body.fullname,
        email : req.body.email
      }
    })
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!req.body.gender){
       return res.status(400).json({ error: "Gender field is necessary" });

    }
    if (!/^[6-9]\d{9}$/.test(req.body.mobileNumber)) {
      return res.status(400).json({ error: "Invalid mobile number" });
    }

    if (req.body.altMobileNumber && !/^[6-9]\d{9}$/.test(req.body.altMobileNumber)) {
      return res.status(400).json({ error: "Invalid alternate mobile number" });
    }

    if (req.body.linkedInUrl && !/^https:\/\/(www\.)?linkedin\.com\//.test(req.body.linkedInUrl)) {
      return res.status(400).json({ error: "Invalid LinkedIn URL" });
    }

    if (req.body.githubUrl && !/^https:\/\/(www\.)?github\.com\//.test(req.body.githubUrl)) {
      return res.status(400).json({ error: "Invalid GitHub URL" });
    }

    if (!req.body.permanentAddress) {
      return res.status(400).json({ error: "Permanent address is too short" });
    }

    if (!/^\d{6}$/.test(req.body.permanentPincode)) {
      return res.status(400).json({ error: "Invalid permanent pincode" });
    }

    if (!req.body.currentAddress) {
      return res.status(400).json({ error: "Current address is too short" });
    }

    if (!/^\d{6}$/.test(req.body.currentPincode)) {
      return res.status(400).json({ error: "Invalid current pincode" });
    }

    if (!req.body.category){
      return res.status(400).json({ error: "Category field is necessary" });

    }


    const personalInfo = await prisma.personalInfo.create({

      data: {
        userId: user.id,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber,
        altMobileNumber: req.body.altMobileNumber,
        linkedInUrl: req.body.linkedInUrl || "",
        githubUrl: req.body.githubUrl || "",
        permanentAddress: req.body.permanentAddress,
        permanentPincode: req.body.permanentPincode,
        currentAddress: req.body.currentAddress || req.body.permanentAddress ,
        currentPincode: req.body.currentPincode || req.body.permanentPincode,
        category: req.body.category,
        hasDisability: req.body.hasDisability || false
        //fullname , emailid gender dob mobile alnernatemb linkedin github permannent addres pincode current address current pin code category disability 
      },
    });
    res.status(201).json(personalInfo);
  } catch (error) {
    console.error("Create PersonalInfo Error:", error);
    res.status(500).json({ error: "Failed to create personal info" });
  }
};

// personal info le le user id se
export const getPersonalInfoByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const personalInfo = await prisma.personalInfo.findUnique({
     where: {
      userId: userId!
     },
    });

    if (!personalInfo) {
      res.status(404).json({ error: "Personal info not found" });
      return;
    }

    res.json(personalInfo);
  } catch (error) {
    console.error("Get PersonalInfo Error:", error);
    res.status(500).json({ error: "Failed to fetch personal info" });
  }
};

//  Update PersonalInfo user id se
export const updatePersonalInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedPersonalInfo = await prisma.personalInfo.update({
      where: { userId : userId! },
      data: req.body,
    });

    res.json(updatedPersonalInfo);
  } catch (error) {
    console.error("Update PersonalInfo Error:", error);
    res.status(500).json({ error: "Failed to update personal info" });
  }
};

//  Delete PersonalInfo user id se
export const deletePersonalInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await prisma.personalInfo.delete({
      where: { userId :userId! },
    });

    res.json({ message: "Personal info deleted successfully" });
  } catch (error) {
    console.error("Delete PersonalInfo Error:", error);
    res.status(500).json({ error: "Failed to delete personal info" });
  }
};









