/*
  Warnings:

  - You are about to drop the column `key_n` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `private_key_d` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `public_key_e` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the `KetuaProgramStudi` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "key_n",
DROP COLUMN "private_key_d",
DROP COLUMN "public_key_e";

-- DropTable
DROP TABLE "KetuaProgramStudi";

-- CreateTable
CREATE TABLE "KeyKetuaProgramStudi" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "public_key_e" TEXT NOT NULL,
    "private_key_d" TEXT NOT NULL,
    "modulus_n" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeyKetuaProgramStudi_pkey" PRIMARY KEY ("id")
);
