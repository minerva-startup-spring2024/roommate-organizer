/*
  Warnings:

  - You are about to drop the column `buildingOwnerId` on the `building` table. All the data in the column will be lost.
  - Made the column `buildingId` on table `room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."building" DROP CONSTRAINT "building_buildingOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."room" DROP CONSTRAINT "room_buildingId_fkey";

-- DropIndex
DROP INDEX "public"."room_buildingId_key";

-- AlterTable
ALTER TABLE "public"."building" DROP COLUMN "buildingOwnerId";

-- AlterTable
ALTER TABLE "public"."room" ALTER COLUMN "buildingId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."_BuildingMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BuildingMembers_AB_unique" ON "public"."_BuildingMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_BuildingMembers_B_index" ON "public"."_BuildingMembers"("B");

-- AddForeignKey
ALTER TABLE "public"."room" ADD CONSTRAINT "room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "public"."building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BuildingMembers" ADD CONSTRAINT "_BuildingMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BuildingMembers" ADD CONSTRAINT "_BuildingMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
