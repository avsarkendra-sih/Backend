import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

//  Create kar de skill
export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await prisma.skill.create({
      data: req.body,
    });
    res.status(201).json(skill);
  } catch (error) {
    console.error("Create Skill Error:", error);
    res.status(500).json({ error: "Failed to create skill" });
  }
};

//  Skills get kar by userId siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
export const getSkillsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const skills = await prisma.skill.findMany({
      where: { userId :userId! },
    });

    if (!skills) {
      res.status(404).json({ error: "No skills found" });
      return;
    }

    res.json(skills);
  } catch (error) {
    console.error("Get Skills Error:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};

// update kar de skills ko
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedSkill = await prisma.skill.update({
      where: {
        id: userId!
      },
      data: req.body,
    });

    res.json(updatedSkill);
  } catch (error) {
    console.error("Update Skill Error:", error);
    res.status(500).json({ error: "Failed to update skill" });
  }
};

// delete Skill by userid   
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await prisma.skill.delete({
      where: { id: userId! },
    });

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Delete Skill Error:", error);
    res.status(500).json({ error: "Failed to delete skill" });
  }
};