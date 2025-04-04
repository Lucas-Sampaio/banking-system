/*
  Warnings:

  - You are about to drop the column `dateTransaction` on the `Transaction` table. All the data in the column will be lost.
  - Changed the type of `number` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Transaction_dateTransaction_idx";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "number",
ADD COLUMN     "number" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "dateTransaction";

-- CreateIndex
CREATE UNIQUE INDEX "Account_number_key" ON "Account"("number");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");
