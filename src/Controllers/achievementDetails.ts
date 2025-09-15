import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// create kar siiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuu
export const createAchievement = async (req: Request, res: Response) => {
  try {
    const achievement = await prisma.achievement.create({
      data: req.body,
    });
    res.status(201).json(achievement);
  } catch (error) {
    console.error("Create Achievement Error:", error);
    res.status(500).json({ error: "Failed to create achievement" });
  }
};

// get karo by userid
export const getAchievementsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const achievements = await prisma.achievement.findMany({
      where: { userId:userId! },
    });

    if (!achievements) {
      res.status(404).json({ error: "No achievements found" });
      return;
    }

    res.json(achievements);
  } catch (error) {
    console.error("Get Achievements Error:", error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
};

// update 
export const updateAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedAchievement = await prisma.achievement.update({
      where: { id:id! },
      data: req.body,
    });

    res.json(updatedAchievement);
  } catch (error) {
    console.error("Update Achievement Error:", error);
    res.status(500).json({ error: "Failed to update achievement" });
  }
};

// delete 
export const deleteAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.achievement.delete({
      where: { id:id! },
    });

    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error("Delete Achievement Error:", error);
    res.status(500).json({ error: "Failed to delete achievement" });
  }
};