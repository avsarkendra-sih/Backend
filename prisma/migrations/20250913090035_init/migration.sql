/*
  Warnings:

  - You are about to drop the column `type` on the `JobPosting` table. All the data in the column will be lost.
  - Added the required column `jobType` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('SDE', 'GAME_DEV', 'TESTING', 'CLOUD', 'BLOCKCHAIN', 'DATA_ENGINEER', 'UI_UX', 'CYBERSECURITY', 'PRODUCT_MANAGER');

-- AlterTable
ALTER TABLE "public"."JobPosting" DROP COLUMN "type",
ADD COLUMN     "jobType" "public"."JobType" NOT NULL;
