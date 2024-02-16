-- AlterTable
ALTER TABLE "public"."profile" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."shopping_list" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
