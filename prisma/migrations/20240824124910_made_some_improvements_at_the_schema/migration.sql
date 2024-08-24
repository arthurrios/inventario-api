/*
  Warnings:

  - Added the required column `status` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('PENDENTE', 'ENVIADO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CLIENTE', 'FORNECEDOR');

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "OrderItemStatus" NOT NULL,
ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL;

-- CreateIndex
CREATE INDEX "idx_orderId" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "idx_productId" ON "order_items"("productId");

-- CreateIndex
CREATE INDEX "idx_categoryId" ON "products"("categoryId");
