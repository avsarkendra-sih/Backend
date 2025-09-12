import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// jaldi se personal info kar de 
export const createPersonalInfo = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const personalInfo = await prisma.personalInfo.create({
      data: {
        userId: req.body.userId,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber,
        altMobileNumber: req.body.altMobileNumber,
        linkedInUrl: req.body.linkedInUrl,
        githubUrl: req.body.githubUrl,
        permanentAddress: req.body.permanentAddress,
        permanentPincode: req.body.permanentPincode,
        currentAddress: req.body.currentAddress,
        currentPincode: req.body.currentPincode,
        category: req.body.category,
        hasDisability: req.body.hasDisability
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









