-- AlterTable
ALTER TABLE "public"."announcement" ADD COLUMN     "sentToId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."announcement" ADD CONSTRAINT "announcement_sentToId_fkey" FOREIGN KEY ("sentToId") REFERENCES "public"."profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
