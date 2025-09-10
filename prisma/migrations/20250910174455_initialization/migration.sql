-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('GENERAL', 'OBC', 'SC', 'ST', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."AcademicLevel" AS ENUM ('TENTH', 'TWELFTH', 'DIPLOMA', 'UG', 'PG', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."SkillCategory" AS ENUM ('TECHNICAL', 'SOFT_SKILLS', 'LANGUAGE', 'TOOL');

-- CreateEnum
CREATE TYPE "public"."UploadType" AS ENUM ('PROFILE_PHOTO', 'SIGNATURE', 'TENTH_MARKSHEET', 'TWELFTH_MARKSHEET', 'COLLEGE_ID', 'DEGREE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."InternshipMode" AS ENUM ('OFFLINE', 'HYBRID', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "public"."Sector" AS ENUM ('IT', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'AGRICULTURE', 'DESIGN', 'MARKETING', 'CORE_ENGINEERING', 'HUMAN_RESOURCES', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ProfileStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "isAadhaarVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileStatus" "public"."ProfileStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PersonalInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gender" "public"."Gender",
    "mobileNumber" TEXT NOT NULL,
    "altMobileNumber" TEXT,
    "linkedInUrl" TEXT,
    "githubUrl" TEXT,
    "permanentAddress" TEXT NOT NULL,
    "permanentPincode" TEXT NOT NULL,
    "currentAddress" TEXT,
    "currentPincode" TEXT,
    "category" "public"."Category" NOT NULL,
    "hasDisability" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AcademicRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" "public"."AcademicLevel" NOT NULL,
    "schoolName" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "yearOfPassing" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION,
    "cgpa" DOUBLE PRECISION,
    "backlogs" BOOLEAN DEFAULT false,
    "collegeName" TEXT,
    "university" TEXT,
    "branch" TEXT,
    "currentYear" INTEGER,
    "currentSem" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "public"."SkillCategory" NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Certification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "certificateUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "techStack" TEXT[],
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "certificationUrl" TEXT,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FileUpload" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."UploadType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Preference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "internshipMode" "public"."InternshipMode" NOT NULL,
    "preferredLocation" TEXT NOT NULL,
    "sectorOfInterest" "public"."Sector"[],
    "languagesKnown" TEXT[],
    "willingToRelocate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobPosting" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "skillsRequired" TEXT[],
    "location" TEXT NOT NULL,
    "mode" "public"."InternshipMode" NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "specialRequirements" TEXT,
    "duration" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhaarNumber_key" ON "public"."User"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_userId_key" ON "public"."PersonalInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "public"."Preference"("userId");

-- AddForeignKey
ALTER TABLE "public"."PersonalInfo" ADD CONSTRAINT "PersonalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AcademicRecord" ADD CONSTRAINT "AcademicRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certification" ADD CONSTRAINT "Certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FileUpload" ADD CONSTRAINT "FileUpload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
