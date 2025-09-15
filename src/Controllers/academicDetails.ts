import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// academic record create kar de siuuuuuu
export const createAcademicRecord = async (req: Request, res: Response) => {
  try {
    const academicRecord = await prisma.academicRecord.create({
      data: req.body,
    });
    res.status(201).json(academicRecord);
  } catch (error) {
    console.error("Create AcademicRecord Error:", error);
    res.status(500).json({ error: "Failed to create academic record" });
  }
};

//  academicRecords by userId ko get kar le bete
export const getAcademicRecordsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const records = await prisma.academicRecord.findMany({
      where: { userId :userId! },
    });

    if (!records ) {
      res.status(404).json({ error: "No academic records found" });
      return;
    }

    res.json(records);
  } catch (error) {
    console.error("Get AcademicRecords Error:", error);
    res.status(500).json({ error: "Failed to fetch academic records" });
  }
};

//  Update kar de jaldi se 
export const updateAcademicRecordByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedRecord = await prisma.academicRecord.update({
      where: { id : id! },
      data: req.body,
    });

    res.json(updatedRecord);
  } catch (error) {
    console.error("Update AcademicRecord Error:", error);
    res.status(500).json({ error: "Failed to update academic record" });
  }
};

//  Delete kar userId ki maddat se
export const deleteAcademicRecordByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.academicRecord.delete({
      where: { id :id!},
    });

    res.json({ message: "Academic record deleted successfully" });
  } catch (error) {
    console.error("Delete AcademicRecord Error:", error);
    res.status(500).json({ error: "Failed to delete academic record" });
  }
};
