-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'roommate', 'manager');

-- AlterTable
ALTER TABLE "public"."profile" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'roommate';
