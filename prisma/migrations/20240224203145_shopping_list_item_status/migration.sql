/*
  Warnings:

  - The `status` column on the `shopping_list_item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ShoppingListItemStatus" AS ENUM ('OPEN', 'CANCELED', 'DONE');

-- AlterTable
ALTER TABLE "public"."shopping_list_item" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ShoppingListItemStatus" NOT NULL DEFAULT 'OPEN';
