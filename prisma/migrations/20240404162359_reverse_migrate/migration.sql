/*
  Warnings:

  - A unique constraint covering the columns `[buildingId]` on the table `room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "room_buildingId_key" ON "public"."room"("buildingId");
