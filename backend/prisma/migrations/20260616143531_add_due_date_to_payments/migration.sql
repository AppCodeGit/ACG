-- DropIndex
DROP INDEX "Payment_transactionId_key";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "dueDate" TIMESTAMP(3);
