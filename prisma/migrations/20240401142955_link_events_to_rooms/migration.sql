-- AlterTable
ALTER TABLE "public"."event" ADD COLUMN     "roomId" TEXT,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AddForeignKey
ALTER TABLE "public"."event" ADD CONSTRAINT "event_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
