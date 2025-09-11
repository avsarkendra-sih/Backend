import { prisma } from "../config/db.js";
import type { Request, Response } from "express";

// creating personal info
export const createPersonalInfo = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      gender,
      mobileNumber,
      altMobileNumber,
      linkedInUrl,
      githubUrl,
      permanentAddress,
      permanentPincode,
      currentAddress,
      currentPincode,
      category,
      hasDisability,
    } = req.body;

    // 1️ Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 2️ Check if personal info already exists (because userId is unique)
    const existingInfo = await prisma.personalInfo.findUnique({ where: { userId } });
    if (existingInfo) {
      return res.status(400).json({ error: "Personal info already exists for this user" });
    }

    // 3️ Create personal info
    const personalInfo = await prisma.personalInfo.create({
      data: {
        userId,
        gender,
        mobileNumber,
        altMobileNumber,
        linkedInUrl,
        githubUrl,
        permanentAddress,
        permanentPincode,
        currentAddress,
        currentPincode,
        category,
        hasDisability,
      },
    });

    res.status(201).json(personalInfo);
  } catch (error) {
    console.error("Create PersonalInfo Error:", error);
    res.status(500).json({ error: "Failed to create personal info" });
  }
};










