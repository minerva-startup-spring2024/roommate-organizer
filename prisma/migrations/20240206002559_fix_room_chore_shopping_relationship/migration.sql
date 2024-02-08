/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `chores_lists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `shopping_lists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `chores_lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `shopping_lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chores_lists" ADD COLUMN     "roomId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "shopping_lists" ADD COLUMN     "roomId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chores_lists_roomId_key" ON "chores_lists"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_lists_roomId_key" ON "shopping_lists"("roomId");

-- AddForeignKey
ALTER TABLE "shopping_lists" ADD CONSTRAINT "shopping_lists_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chores_lists" ADD CONSTRAINT "chores_lists_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
