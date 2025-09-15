import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// create 
export const createPreference = async (req: Request, res: Response) => {
  try {
    const preference = await prisma.preference.create({
      data: req.body,
    });
    res.status(201).json(preference);
  } catch (error) {
    console.error("Create Preference Error:", error);
    res.status(500).json({ error: "Failed to create preference" });
  }
};

// get
export const getPreferenceByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const preference = await prisma.preference.findUnique({
      where: { userId :userId!},
    });

    if (!preference) {
      res.status(404).json({ error: "Preference not found" });
      return;
    }

    res.json(preference);
  } catch (error) {
    console.error("Get Preference Error:", error);
    res.status(500).json({ error: "Failed to fetch preference" });
  }
};

// update
export const updatePreference = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedPreference = await prisma.preference.update({
      where: { userId:userId! },
      data: req.body,
    });

    res.json(updatedPreference);
  } catch (error) {
    console.error("Update Preference Error:", error);
    res.status(500).json({ error: "Failed to update preference" });
  }
};

// delete
export const deletePreference = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await prisma.preference.delete({
      where: { userId:userId! },
    });

    res.json({ message: "Preference deleted successfully" });
  } catch (error) {
    console.error("Delete Preference Error:", error);
    res.status(500).json({ error: "Failed to delete preference" });
  }
};