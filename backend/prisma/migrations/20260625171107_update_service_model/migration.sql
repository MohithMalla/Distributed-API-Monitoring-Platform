/*
  Warnings:

  - The `lastStatus` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `method` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'PATCH', 'DELETE');

-- CreateEnum
CREATE TYPE "MonitorStatus" AS ENUM ('UP', 'DOWN', 'UNKNOWN');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_projectId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "consecutiveFailures" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sslMonitoring" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "method",
ADD COLUMN     "method" "HttpMethod" NOT NULL,
DROP COLUMN "lastStatus",
ADD COLUMN     "lastStatus" "MonitorStatus" DEFAULT 'UNKNOWN';

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
