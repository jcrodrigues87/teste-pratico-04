/*
  Warnings:

  - Added the required column `address` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceProvider" ADD COLUMN     "address" TEXT NOT NULL;
