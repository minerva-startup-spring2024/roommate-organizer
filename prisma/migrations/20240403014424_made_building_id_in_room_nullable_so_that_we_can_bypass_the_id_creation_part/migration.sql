-- DropForeignKey
ALTER TABLE "public"."room" DROP CONSTRAINT "room_buildingId_fkey";

-- AlterTable
ALTER TABLE "public"."room" ALTER COLUMN "buildingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."room" ADD CONSTRAINT "room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "public"."building"("id") ON DELETE SET NULL ON UPDATE CASCADE;
