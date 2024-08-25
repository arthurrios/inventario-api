/*
  Warnings:

  - You are about to drop the column `price` on the `purchase_order_details` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `sale_details` table. All the data in the column will be lost.
  - Added the required column `unit_price` to the `purchase_order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `purchase_order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `sale_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sale_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_order_details" DROP COLUMN "price",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sale_details" DROP COLUMN "price",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
