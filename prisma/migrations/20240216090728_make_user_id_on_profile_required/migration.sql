/*
  Warnings:

  - Made the column `userId` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."profile" ALTER COLUMN "userId" SET NOT NULL;
