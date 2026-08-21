/*
  Warnings:

  - The values [SUBSCRIPTION_ACTIVATED,SUBSCRIPTION_RENEWED,SUBSCRIPTION_CANCELED,SUBSCRIPTION_EXPIRING,PAYMENT_FAILED] on the enum `StudentNotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isSubscriptionPayment` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionInvoiceId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paystackReference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StudentNotificationType_new" AS ENUM ('GRADE_POSTED', 'ASSIGNMENT_REMINDER', 'SYSTEM_ANNOUNCEMENT', 'COURSE_ENROLLMENT', 'PAYMENT_CONFIRMATION');
ALTER TABLE "StudentNotification" ALTER COLUMN "type" TYPE "StudentNotificationType_new" USING ("type"::text::"StudentNotificationType_new");
ALTER TYPE "StudentNotificationType" RENAME TO "StudentNotificationType_old";
ALTER TYPE "StudentNotificationType_new" RENAME TO "StudentNotificationType";
DROP TYPE "public"."StudentNotificationType_old";
COMMIT;

-- DropIndex
DROP INDEX "Payment_subscriptionInvoiceId_idx";

-- DropIndex
DROP INDEX "Student_stripeCustomerId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "isSubscriptionPayment",
DROP COLUMN "subscriptionInvoiceId",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "paymentGateway" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paystackAccessCode" TEXT,
ADD COLUMN     "paystackChannel" TEXT,
ADD COLUMN     "paystackCurrency" TEXT DEFAULT 'GHS',
ADD COLUMN     "paystackReference" TEXT;

-- AlterTable
ALTER TABLE "SubscriptionNotification" ADD COLUMN     "data" JSONB;

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" SERIAL NOT NULL,
    "stripeEventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "metadata" JSONB,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebhookLog_stripeEventId_key" ON "WebhookLog"("stripeEventId");

-- CreateIndex
CREATE INDEX "WebhookLog_stripeEventId_idx" ON "WebhookLog"("stripeEventId");

-- CreateIndex
CREATE INDEX "WebhookLog_eventType_idx" ON "WebhookLog"("eventType");

-- CreateIndex
CREATE INDEX "WebhookLog_processedAt_idx" ON "WebhookLog"("processedAt");

-- CreateIndex
CREATE INDEX "WebhookLog_status_idx" ON "WebhookLog"("status");

-- CreateIndex
CREATE INDEX "Course_programId_idx" ON "Course"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paystackReference_key" ON "Payment"("paystackReference");

-- CreateIndex
CREATE INDEX "Payment_paystackReference_idx" ON "Payment"("paystackReference");

-- CreateIndex
CREATE INDEX "Student_email_idx" ON "Student"("email");

-- CreateIndex
CREATE INDEX "Student_userId_idx" ON "Student"("userId");

-- CreateIndex
CREATE INDEX "StudentSubscription_userId_idx" ON "StudentSubscription"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_cognitoId_idx" ON "User"("cognitoId");
