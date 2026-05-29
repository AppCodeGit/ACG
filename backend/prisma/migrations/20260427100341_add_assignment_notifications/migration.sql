-- CreateTable
CREATE TABLE "AssignmentNotification" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "studentName" TEXT NOT NULL,
    "assignmentTitle" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssignmentNotification_adminId_idx" ON "AssignmentNotification"("adminId");

-- CreateIndex
CREATE INDEX "AssignmentNotification_read_idx" ON "AssignmentNotification"("read");

-- CreateIndex
CREATE INDEX "AssignmentNotification_createdAt_idx" ON "AssignmentNotification"("createdAt");
