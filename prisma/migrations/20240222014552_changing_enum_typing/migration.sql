/*
  Warnings:

  - The values [open,canceled,done] on the enum `ChoreStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,roommate,manager] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ChoreStatus_new" AS ENUM ('OPEN', 'CANCELED', 'DONE');
ALTER TABLE "public"."chore_list_item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."chore_list_item" ALTER COLUMN "status" TYPE "public"."ChoreStatus_new" USING ("status"::text::"public"."ChoreStatus_new");
ALTER TYPE "public"."ChoreStatus" RENAME TO "ChoreStatus_old";
ALTER TYPE "public"."ChoreStatus_new" RENAME TO "ChoreStatus";
DROP TYPE "public"."ChoreStatus_old";
ALTER TABLE "public"."chore_list_item" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('ADMIN', 'ROOMMATE', 'MANAGER');
ALTER TABLE "public"."profile" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."profile" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."profile" ALTER COLUMN "role" SET DEFAULT 'ROOMMATE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."chore_list_item" ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "public"."profile" ALTER COLUMN "role" SET DEFAULT 'ROOMMATE';
