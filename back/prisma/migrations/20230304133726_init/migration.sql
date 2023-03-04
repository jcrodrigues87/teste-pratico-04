/*
  Warnings:

  - You are about to drop the column `razao` on the `Service_provider` table. All the data in the column will be lost.
  - Added the required column `corporate_name` to the `Service_provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service_provider" DROP COLUMN "razao",
ADD COLUMN     "corporate_name" TEXT NOT NULL;
