/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'CONSULTOR_DE_ESTOQUE';

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
