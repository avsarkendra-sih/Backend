/*
  Warnings:

  - The values [VIRTUAL] on the enum `InternshipMode` will be removed. If these variants are still used in the database, this will fail.
  - The values [TWELFTH_MARKSHEET] on the enum `UploadType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `board` on the `AcademicRecord` table. All the data in the column will be lost.
  - You are about to drop the column `collegeName` on the `AcademicRecord` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `AcademicRecord` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `AcademicRecord` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `board_university` to the `AcademicRecord` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."CertificateType" AS ENUM ('Hackathon', 'Internship', 'Course');

-- AlterEnum
ALTER TYPE "public"."AcademicLevel" ADD VALUE 'ITI';

-- AlterEnum
BEGIN;
CREATE TYPE "public"."InternshipMode_new" AS ENUM ('OFFLINE', 'HYBRID', 'ONLINE');
ALTER TABLE "public"."Preference" ALTER COLUMN "internshipMode" TYPE "public"."InternshipMode_new" USING ("internshipMode"::text::"public"."InternshipMode_new");
ALTER TABLE "public"."JobPosting" ALTER COLUMN "mode" TYPE "public"."InternshipMode_new" USING ("mode"::text::"public"."InternshipMode_new");
ALTER TYPE "public"."InternshipMode" RENAME TO "InternshipMode_old";
ALTER TYPE "public"."InternshipMode_new" RENAME TO "InternshipMode";
DROP TYPE "public"."InternshipMode_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."UploadType_new" AS ENUM ('PROFILE_PHOTO', 'SIGNATURE', 'TENTH_MARKSHEET', 'TWELTH_MARKSHEET', 'COLLEGE_ID', 'DEGREE', 'OTHER');
ALTER TABLE "public"."FileUpload" ALTER COLUMN "type" TYPE "public"."UploadType_new" USING ("type"::text::"public"."UploadType_new");
ALTER TYPE "public"."UploadType" RENAME TO "UploadType_old";
ALTER TYPE "public"."UploadType_new" RENAME TO "UploadType";
DROP TYPE "public"."UploadType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Achievement" DROP CONSTRAINT "Achievement_userId_fkey";

-- AlterTable
ALTER TABLE "public"."AcademicRecord" DROP COLUMN "board",
DROP COLUMN "collegeName",
DROP COLUMN "schoolName",
DROP COLUMN "university",
ADD COLUMN     "board_university" TEXT NOT NULL,
ADD COLUMN     "current_cgpa" DOUBLE PRECISION,
ADD COLUMN     "current_grade" TEXT,
ADD COLUMN     "current_percentage" DOUBLE PRECISION,
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "instituteName" TEXT;

-- AlterTable
ALTER TABLE "public"."Certification" ADD COLUMN     "certificate_type" "public"."CertificateType",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "githublink" TEXT,
ADD COLUMN     "livelink" TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "image";

-- DropTable
DROP TABLE "public"."Achievement";
