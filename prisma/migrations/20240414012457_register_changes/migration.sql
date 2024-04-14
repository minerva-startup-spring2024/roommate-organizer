/*
  Warnings:

  - You are about to drop the column `endTimezone` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `recurrenceException` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `recurrenceId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `recurrenceRule` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `startTimezone` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."event" DROP COLUMN "endTimezone",
DROP COLUMN "followingId",
DROP COLUMN "recurrenceException",
DROP COLUMN "recurrenceId",
DROP COLUMN "recurrenceRule",
DROP COLUMN "startTimezone",
ALTER COLUMN "description" SET DEFAULT 'NULL',
ALTER COLUMN "location" SET DEFAULT 'NULL',
ALTER COLUMN "category" SET DEFAULT 'NULL';
