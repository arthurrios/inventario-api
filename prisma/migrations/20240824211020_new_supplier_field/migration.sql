/*
  Warnings:

  - Added the required column `address` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
