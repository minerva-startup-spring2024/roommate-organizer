-- DropForeignKey
ALTER TABLE "public"."announcement" DROP CONSTRAINT "announcement_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."announcement" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."announcement" ADD CONSTRAINT "announcement_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
