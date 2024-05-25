/*
  Warnings:

  - Changed the type of `nilai` on the `Nilai` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "nilai",
ADD COLUMN     "nilai" TEXT NOT NULL;
