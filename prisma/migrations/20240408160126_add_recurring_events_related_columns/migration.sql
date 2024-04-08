/*
  Warnings:

  - You are about to drop the `_BuildingMembers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[buildingId]` on the table `room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."_BuildingMembers" DROP CONSTRAINT "_BuildingMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BuildingMembers" DROP CONSTRAINT "_BuildingMembers_B_fkey";

-- AlterTable
ALTER TABLE "public"."building" ADD COLUMN     "buildingOwnerId" TEXT;

-- AlterTable
ALTER TABLE "public"."event" ADD COLUMN     "endTimezone" TEXT,
ADD COLUMN     "followingId" TEXT,
ADD COLUMN     "recurrenceException" TEXT,
ADD COLUMN     "recurrenceId" TEXT,
ADD COLUMN     "recurrenceRule" TEXT,
ADD COLUMN     "startTimezone" TEXT,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "category" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."_BuildingMembers";

-- CreateIndex
CREATE UNIQUE INDEX "room_buildingId_key" ON "public"."room"("buildingId");

-- AddForeignKey
ALTER TABLE "public"."building" ADD CONSTRAINT "building_buildingOwnerId_fkey" FOREIGN KEY ("buildingOwnerId") REFERENCES "public"."profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
