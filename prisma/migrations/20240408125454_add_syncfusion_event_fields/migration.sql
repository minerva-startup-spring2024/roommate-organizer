-- AlterTable
ALTER TABLE "public"."event" ADD COLUMN     "endTimezone" TEXT,
ADD COLUMN     "followingId" TEXT,
ADD COLUMN     "recurrenceException" TEXT,
ADD COLUMN     "recurrenceId" TEXT,
ADD COLUMN     "startTimezone" TEXT;