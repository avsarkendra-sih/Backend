import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// create kar de certificate siiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
export const createCertification = async (req: Request, res: Response) => {
  try {
    const certification = await prisma.certification.create({
      data: req.body,
    });
    res.status(201).json(certification);
  } catch (error) {
    console.error("Create Certification Error:", error);
    res.status(500).json({ error: "Failed to create certification" });
  }
};

// get kar
export const getCertificationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const certifications = await prisma.certification.findMany({
      where: { userId : userId!},
    });

    if (!certifications ) {
      res.status(404).json({ error: "No certifications found" });
      return;
    }

    res.json(certifications);
  } catch (error) {
    console.error("Get Certifications Error:", error);
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
};

// update kar
export const updateCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedCertification = await prisma.certification.update({
      where: { id:id! },
      data: req.body,
    });

    res.json(updatedCertification);
  } catch (error) {
    console.error("Update Certification Error:", error);
    res.status(500).json({ error: "Failed to update certification" });
  }
};

// delete kar
export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.certification.delete({
      where: { id : id! },
    });

    res.json({ message: "Certification deleted successfully" });
  } catch (error) {
    console.error("Delete Certification Error:", error);
    res.status(500).json({ error: "Failed to delete certification" });
  }
};