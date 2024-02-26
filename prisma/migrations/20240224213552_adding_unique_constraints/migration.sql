/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `announcement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `chore_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[choreListId]` on the table `chore_list_item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[buildingId]` on the table `room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `shopping_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shoppingListId]` on the table `shopping_list_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "announcement_roomId_key" ON "public"."announcement"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "chore_list_roomId_key" ON "public"."chore_list"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "chore_list_item_choreListId_key" ON "public"."chore_list_item"("choreListId");

-- CreateIndex
CREATE UNIQUE INDEX "room_buildingId_key" ON "public"."room"("buildingId");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_list_roomId_key" ON "public"."shopping_list"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_list_item_shoppingListId_key" ON "public"."shopping_list_item"("shoppingListId");
