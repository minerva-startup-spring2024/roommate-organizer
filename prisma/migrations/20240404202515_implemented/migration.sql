/*
  Warnings:

  - Made the column `buildingId` on table `room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."room" DROP CONSTRAINT "room_buildingId_fkey";

-- DropIndex
DROP INDEX "public"."room_buildingId_key";

-- AlterTable
ALTER TABLE "public"."room" ALTER COLUMN "buildingId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."ProfileBuilding" (
    "profileId" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,

    CONSTRAINT "ProfileBuilding_pkey" PRIMARY KEY ("profileId","buildingId")
);

-- CreateTable
CREATE TABLE "public"."_ProfileBuilding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileBuilding_AB_unique" ON "public"."_ProfileBuilding"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileBuilding_B_index" ON "public"."_ProfileBuilding"("B");

-- AddForeignKey
ALTER TABLE "public"."ProfileBuilding" ADD CONSTRAINT "ProfileBuilding_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfileBuilding" ADD CONSTRAINT "ProfileBuilding_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "public"."building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room" ADD CONSTRAINT "room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "public"."building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileBuilding" ADD CONSTRAINT "_ProfileBuilding_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileBuilding" ADD CONSTRAINT "_ProfileBuilding_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
