/*
  Warnings:

  - You are about to drop the column `filesPaths` on the `ServiceProvider` table. All the data in the column will be lost.
  - Added the required column `filesPath` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceProvider" DROP COLUMN "filesPaths",
ADD COLUMN     "filesPath" TEXT NOT NULL;
