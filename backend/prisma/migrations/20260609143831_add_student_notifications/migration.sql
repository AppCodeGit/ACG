-- CreateEnum
CREATE TYPE "StudentNotificationType" AS ENUM ('GRADE_POSTED', 'ASSIGNMENT_REMINDER', 'SYSTEM_ANNOUNCEMENT', 'COURSE_ENROLLMENT', 'PAYMENT_CONFIRMATION');

-- CreateTable
CREATE TABLE "StudentNotification" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "type" "StudentNotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentNotification_studentId_idx" ON "StudentNotification"("studentId");

-- CreateIndex
CREATE INDEX "StudentNotification_type_idx" ON "StudentNotification"("type");

-- CreateIndex
CREATE INDEX "StudentNotification_read_idx" ON "StudentNotification"("read");

-- CreateIndex
CREATE INDEX "StudentNotification_createdAt_idx" ON "StudentNotification"("createdAt");

-- AddForeignKey
ALTER TABLE "StudentNotification" ADD CONSTRAINT "StudentNotification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
