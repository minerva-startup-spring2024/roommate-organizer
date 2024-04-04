/*
  Warnings:

  - Made the column `buildingId` on table `room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."room" DROP CONSTRAINT "room_buildingId_fkey";

-- DropIndex
DROP INDEX "public"."room_buildingId_key";

-- AddForeignKey
ALTER TABLE "public"."room" ADD CONSTRAINT "room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "public"."building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
