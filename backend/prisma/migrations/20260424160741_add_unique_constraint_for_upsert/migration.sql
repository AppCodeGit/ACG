/*
  Warnings:

  - A unique constraint covering the columns `[assignmentId,studentId]` on the table `AssignmentSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmission_assignmentId_studentId_key" ON "AssignmentSubmission"("assignmentId", "studentId");
