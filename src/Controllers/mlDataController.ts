import type{ Request, Response } from 'express';
import { prisma } from "../config/db.ts";

export const getMLData = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required in the request body." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: true,
        academicRecords: true,
        projects: true,
        preference: true,
        certifications: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format the data as per expected structure, pulling directly from DB fields
    const response = {
      id: user.id,
      skills: user.skills.map(skill => ({ name: skill.name })),
      academicRecords: user.academicRecords.map(record => ({
        level: record.level,
        instituteName: record.instituteName,
        branch: record.branch,
        cgpa: record.cgpa,
        yearOfPassing: record.yearOfPassing,
        currentYear: record.currentYear ? `${record.currentYear} Year` : null,
      })),
      projects: user.projects.map(project => ({
        title: project.title,
        description: project.description,
        techStack: project.techStack,
      })),
      preference: user.preference ? {
        preferredLocation: user.preference.preferredLocation,
        internshipMode: user.preference.internshipMode,
        willingToRelocate: user.preference.willingToRelocate,
      } : null,
      certifications: user.certifications.map(cert => ({
        name: cert.title,
        issuer: "Unknown", // Or fetch if stored somewhere
        date: cert.startDate.toISOString().split('T')[0],
      })),
      languages: user.preference ? user.preference.languagesKnown : [],
      interests: [] // You can populate this if available elsewhere
    };

    return res.json(response);

  } catch (error) {
    console.error('Error fetching ML data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};