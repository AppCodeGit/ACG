/*
  Warnings:

  - Added the required column `programName` to the `CourseContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CourseContent_courseId_order_key";

-- DropIndex
DROP INDEX "CourseContent_status_idx";

-- DropIndex
DROP INDEX "CourseContent_type_idx";

-- DropIndex
DROP INDEX "CourseContent_uploadedById_idx";

-- AlterTable
ALTER TABLE "CourseContent" ADD COLUMN     "programName" TEXT NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "CourseContent_programName_idx" ON "CourseContent"("programName");
