/*
  Warnings:

  - A unique constraint covering the columns `[documentation]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining_spots` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spots` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentation` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "creator" TEXT NOT NULL,
ADD COLUMN     "remaining_spots" INTEGER NOT NULL,
ADD COLUMN     "spots" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "documentation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_documentation_key" ON "users"("documentation");
