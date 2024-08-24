/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENTE', 'FORNECEDOR', 'OPERADOR');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profilePicture",
DROP COLUMN "type",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'OPERADOR';

-- DropEnum
DROP TYPE "UserType";
