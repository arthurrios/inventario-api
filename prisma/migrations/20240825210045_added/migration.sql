/*
  Warnings:

  - Added the required column `desciption` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "desciption" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
