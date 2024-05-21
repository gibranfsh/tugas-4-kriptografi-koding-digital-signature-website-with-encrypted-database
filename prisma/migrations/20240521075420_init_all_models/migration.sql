-- CreateEnum
CREATE TYPE "INDEKS" AS ENUM ('A', 'AB', 'B', 'BC', 'C', 'D', 'E');

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlah_sks" INTEGER NOT NULL DEFAULT 0,
    "ipk" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tanda_tangan" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "Nilai" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nilai" "INDEKS" NOT NULL DEFAULT 'A',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nim" TEXT NOT NULL,
    "kode_mata_kuliah" TEXT NOT NULL,

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MataKuliah" (
    "kode_mata_kuliah" TEXT NOT NULL,
    "nama_mata_kuliah" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MataKuliah_pkey" PRIMARY KEY ("kode_mata_kuliah")
);

-- CreateTable
CREATE TABLE "KetuaProgramStudi" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nama" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "private_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KetuaProgramStudi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "MataKuliah_kode_mata_kuliah_key" ON "MataKuliah"("kode_mata_kuliah");

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_kode_mata_kuliah_fkey" FOREIGN KEY ("kode_mata_kuliah") REFERENCES "MataKuliah"("kode_mata_kuliah") ON DELETE RESTRICT ON UPDATE CASCADE;
