-- AlterTable
ALTER TABLE "public"."event" ADD COLUMN     "endTimezone" TEXT,
ADD COLUMN     "followingId" TEXT,
ADD COLUMN     "recurrenceException" TEXT,
ADD COLUMN     "recurrenceId" TEXT,
ADD COLUMN     "recurrenceRule" TEXT,
ADD COLUMN     "startTimezone" TEXT,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "category" DROP DEFAULT;
