import { prisma } from "../config/db.ts";
import type { Request, Response } from "express";

// create kar de bhai project ko
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({
      data: req.body,


    });
    res.status(201).json(project);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// get karo project by userId
export const getProjectsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const projects = await prisma.project.findMany({
      where: { userId : userId! },
    });

    if (!projects ) {
      res.status(404).json({ error: "No projects found" });
      return;
    }

    res.json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// chal beta fatafat update kar 
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedProject = await prisma.project.update({
      where: { id:id! },
      data: req.body,
    });

    res.json(updatedProject);
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// delete karo siiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id:id! },
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};