import { prisma } from "@/app/lib/prisma";
import { rc4ModifiedEncrypt } from "@/cipher/rc4Modified";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { nimMahasiswa: string } }
) {
  const data = await req.json();

  const { nimMahasiswa } = params;
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: {
      nim: rc4ModifiedEncrypt(nimMahasiswa, "bekasi"),
    },
  });
  if (!mahasiswa) {
    return NextResponse.json({ error: "Mahasiswa not found" }, { status: 404 });
  }

  const { nilai, kode_mata_kuliah } = data;
  const mataKuliah = await prisma.mataKuliah.findUnique({
    where: {
      kode_mata_kuliah: rc4ModifiedEncrypt(kode_mata_kuliah, "bekasi"),
    },
  });
  if (!mataKuliah) {
    return NextResponse.json(
      { error: "Mata kuliah not found" },
      { status: 404 }
    );
  }

  try {
    const newNilai = await prisma.nilai.create({
      data: {
        nilai,
        nim: nimMahasiswa,
        mahasiswa,
        kode_mata_kuliah,
        MataKuliah: mataKuliah,
      },
    });

    return NextResponse.json(
      { message: "Nilai created successfully", newNilai },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating nilai:", error);
    return NextResponse.json(
      { error: "Error creating nilai" },
      { status: 500 }
    );
  }
}
