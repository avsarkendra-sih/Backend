import type{ Request, Response } from "express";
import { prisma } from "../config/db.ts";
import { InternshipMode,JobType, Prisma } from "@prisma/client";
import { ApiError } from "../utils/apiError.ts";

interface JobInput {
  companyName: string;
  jobTitle: string;
  skillsRequired: string[];
  location: string;
  mode: InternshipMode;
  jobDescription: string;
  specialRequirements?: string;
  duration: string;
  jobType: JobType;
}

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobInput: JobInput = req.body;

    if (!jobInput.companyName || !jobInput.jobTitle || !jobInput.skillsRequired.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const job = await prisma.jobPosting.create({ data: jobInput });
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create job posting" });
  }
};

// export const getJobs = async (req: Request, res: Response) => {
//   try {
//     const { location, jobType, mode } = req.query;
//     if(!location && !jobType && !mode){
//         throw new ApiError(404,"fields not satisfied");
//     }
//  const whereClause: Prisma.JobPostingWhereInput = {};
    
//     if (location) {
//       whereClause.location = { equals: String(location) };
//     }
    
//     if (jobType) {
//       whereClause.jobType = { equals: jobType as JobType };
//     }
    
//     if (mode) {
//       whereClause.mode = { equals: mode as InternshipMode };
//     }

//     const jobs = await prisma.jobPosting.findMany({
//       where: whereClause,
//       orderBy: { createdAt: "desc" },
//     });

//     res.json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch jobs" });
//   }
// };
export const getJobs = async (req: Request, res: Response) => {
  try {
    // Fetch all job postings from the database
    const jobs = await prisma.jobPosting.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Return the jobs
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch jobs",
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Job ID is required" });

    const job = await prisma.jobPosting.findUnique({ where: { id } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Job ID is required" });

    const jobInput: Partial<JobInput> = req.body;

    const job = await prisma.jobPosting.update({
      where: { id }!,
      data: jobInput,
    });

    res.json(job);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({ error: "Job not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to update job posting" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Job ID is required" });

    await prisma.jobPosting.delete({ where: { id } });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({ error: "Job not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to delete job posting" });
  }
};
