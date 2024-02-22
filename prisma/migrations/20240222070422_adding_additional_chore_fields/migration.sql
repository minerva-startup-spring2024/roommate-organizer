-- AlterTable
ALTER TABLE "public"."chore_list_item" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "proof" TEXT,
ADD COLUMN     "requiresProof" BOOLEAN;
