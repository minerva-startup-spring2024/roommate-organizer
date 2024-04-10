-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'ROOMMATE', 'MANAGER');

-- CreateEnum
CREATE TYPE "public"."ChoreStatus" AS ENUM ('OPEN', 'CANCELED', 'DONE');

-- CreateEnum
CREATE TYPE "public"."ShoppingListItemStatus" AS ENUM ('OPEN', 'CANCELED', 'DONE');

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT,
    "lastName" TEXT,
    "metadata" JSONB,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'ROOMMATE',

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."building" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "address" TEXT,
    "metadata" JSONB,

    CONSTRAINT "building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."room" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "buildingId" TEXT,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chore_list" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "roomId" TEXT NOT NULL,

    CONSTRAINT "chore_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chore_list_item" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "type" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "choreListId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "createdById" TEXT,
    "status" "public"."ChoreStatus" NOT NULL DEFAULT 'OPEN',
    "dueDate" TIMESTAMP(3),
    "proof" TEXT,
    "requiresProof" BOOLEAN,

    CONSTRAINT "chore_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shopping_list" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "roomId" TEXT NOT NULL,

    CONSTRAINT "shopping_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shopping_list_item" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "type" TEXT,
    "quantity" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "shoppingListId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "createdById" TEXT,
    "status" "public"."ShoppingListItemStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "shopping_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."announcement" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT,
    "status" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "roomId" TEXT NOT NULL,
    "sentById" TEXT NOT NULL,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "startTime" TIMESTAMPTZ(6) NOT NULL,
    "endTime" TIMESTAMPTZ(6) NOT NULL,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "category" TEXT,
    "metadata" JSONB,
    "roomId" TEXT,
    "endTimezone" TEXT,
    "followingId" TEXT,
    "recurrenceException" TEXT,
    "recurrenceId" TEXT,
    "recurrenceRule" TEXT,
    "startTimezone" TEXT,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_RoomMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."_BuildingMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "public"."profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "room_buildingId_key" ON "public"."room"("buildingId");

-- CreateIndex
CREATE UNIQUE INDEX "chore_list_roomId_key" ON "public"."chore_list"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_list_roomId_key" ON "public"."shopping_list"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomMembers_AB_unique" ON "public"."_RoomMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomMembers_B_index" ON "public"."_RoomMembers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BuildingMembers_AB_unique" ON "public"."_BuildingMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_BuildingMembers_B_index" ON "public"."_BuildingMembers"("B");

-- AddForeignKey
ALTER TABLE "public"."room" ADD CONSTRAINT "room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "public"."building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chore_list" ADD CONSTRAINT "chore_list_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chore_list_item" ADD CONSTRAINT "chore_list_item_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chore_list_item" ADD CONSTRAINT "chore_list_item_choreListId_fkey" FOREIGN KEY ("choreListId") REFERENCES "public"."chore_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chore_list_item" ADD CONSTRAINT "chore_list_item_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shopping_list" ADD CONSTRAINT "shopping_list_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shopping_list_item" ADD CONSTRAINT "shopping_list_item_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shopping_list_item" ADD CONSTRAINT "shopping_list_item_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shopping_list_item" ADD CONSTRAINT "shopping_list_item_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "public"."shopping_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."announcement" ADD CONSTRAINT "announcement_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."announcement" ADD CONSTRAINT "announcement_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event" ADD CONSTRAINT "event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event" ADD CONSTRAINT "event_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RoomMembers" ADD CONSTRAINT "_RoomMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RoomMembers" ADD CONSTRAINT "_RoomMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BuildingMembers" ADD CONSTRAINT "_BuildingMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BuildingMembers" ADD CONSTRAINT "_BuildingMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
