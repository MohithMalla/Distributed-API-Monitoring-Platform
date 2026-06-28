-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "averageLatency" DOUBLE PRECISION,
ADD COLUMN     "body" JSONB,
ADD COLUMN     "expectedResponse" TEXT,
ADD COLUMN     "headers" JSONB,
ADD COLUMN     "lastCheckedAt" TIMESTAMP(3),
ADD COLUMN     "lastStatus" TEXT,
ADD COLUMN     "timeout" INTEGER NOT NULL DEFAULT 5000;
