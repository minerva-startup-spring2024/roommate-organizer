/*
  Warnings:

  - You are about to drop the column `sentToId` on the `announcement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[buildingId]` on the table `room` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roomId` on table `announcement` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."announcement" DROP CONSTRAINT "announcement_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."announcement" DROP CONSTRAINT "announcement_sentToId_fkey";

-- AlterTable
ALTER TABLE "public"."announcement" DROP COLUMN "sentToId",
ALTER COLUMN "roomId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "room_buildingId_key" ON "public"."room"("buildingId");

-- AddForeignKey
ALTER TABLE "public"."announcement" ADD CONSTRAINT "announcement_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
