import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// create kar chal 
export const createFileUpload = async (req: Request, res: Response) => {
  try {
    const fileUpload = await prisma.fileUpload.create({
      data: req.body,
    });
    res.status(201).json(fileUpload);
  } catch (error) {
    console.error("Create FileUpload Error:", error);
    res.status(500).json({ error: "Failed to create file upload" });
  }
};

// get
export const getFileUploadsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const uploads = await prisma.fileUpload.findMany({
      where: { userId:userId! },
    });

    if (!uploads) {
      res.status(404).json({ error: "No file uploads found" });
      return;
    }

    res.json(uploads);
  } catch (error) {
    console.error("Get FileUploads Error:", error);
    res.status(500).json({ error: "Failed to fetch file uploads" });
  }
};

// update
export const updateFileUpload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedUpload = await prisma.fileUpload.update({
      where: { id:id! },
      data: req.body,
    });

    res.json(updatedUpload);
  } catch (error) {
    console.error("Update FileUpload Error:", error);
    res.status(500).json({ error: "Failed to update file upload" });
  }
};

// delete
export const deleteFileUpload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.fileUpload.delete({
      where: { id:id! },
    });

    res.json({ message: "File upload deleted successfully" });
  } catch (error) {
    console.error("Delete FileUpload Error:", error);
    res.status(500).json({ error: "Failed to delete file upload" });
  }
};