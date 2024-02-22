/*
  Warnings:

  - The `status` column on the `chore_list_item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ChoreStatus" AS ENUM ('open', 'canceled', 'done');

-- AlterTable
ALTER TABLE "public"."chore_list_item" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ChoreStatus" NOT NULL DEFAULT 'open';
