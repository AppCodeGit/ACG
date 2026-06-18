-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "credits" INTEGER DEFAULT 3;

-- CreateTable
CREATE TABLE "FinalGrade" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "programName" TEXT NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "projectScore" DOUBLE PRECISION NOT NULL,
    "weightedScore" DOUBLE PRECISION,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "certificateUrl" TEXT,
    "issuedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinalGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinalGrade_studentId_key" ON "FinalGrade"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "FinalGrade_studentId_programName_key" ON "FinalGrade"("studentId", "programName");

-- AddForeignKey
ALTER TABLE "FinalGrade" ADD CONSTRAINT "FinalGrade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
