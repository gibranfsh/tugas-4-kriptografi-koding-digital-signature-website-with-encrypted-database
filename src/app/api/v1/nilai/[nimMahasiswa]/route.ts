import { prisma } from "@/app/lib/prisma";
import { rc4ModifiedDecrypt, rc4ModifiedEncrypt } from "@/cipher/rc4Modified";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

const INDEKS = {
  A: 4,
  AB: 3.5,
  B: 3,
  BC: 2.5,
  C: 2,
  D: 1,
  E: 0,
};

export async function POST(
  req: NextRequest,
  { params }: { params: { nimMahasiswa: string } }
) {
  const data = await req.json();

  const { nimMahasiswa } = params;

  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: {
      nim: rc4ModifiedEncrypt(nimMahasiswa, "bekasi") as string,
    },
  });

  if (!mahasiswa) {
    return NextResponse.json({ error: "Mahasiswa not found" }, { status: 404 });
  }

  const { nilai, kode_mata_kuliah } = data;
  const mataKuliah = await prisma.mataKuliah.findUnique({
    where: {
      kode_mata_kuliah: rc4ModifiedEncrypt(
        kode_mata_kuliah,
        "bekasi"
      ) as string,
    },
  });

  if (!mataKuliah) {
    return NextResponse.json(
      { error: "Mata kuliah not found" },
      { status: 404 }
    );
  }

  try {
    const existingNilai = await prisma.nilai.findFirst({
      where: {
        nim: rc4ModifiedEncrypt(nimMahasiswa, "bekasi") as string,
        kode_mata_kuliah: rc4ModifiedEncrypt(
          kode_mata_kuliah,
          "bekasi"
        ) as string,
      },
    });

    if (existingNilai) {
      return NextResponse.json(
        {
          error: `Nilai untuk matkul ${kode_mata_kuliah} untuk NIM ${nimMahasiswa} sudah ada`,
        },
        { status: 400 }
      );
    }

    const newNilai = await prisma.nilai.create({
      data: {
        nilai: rc4ModifiedEncrypt(nilai, "bekasi") as string,
        nim: rc4ModifiedEncrypt(nimMahasiswa, "bekasi") as string,
        kode_mata_kuliah: rc4ModifiedEncrypt(
          kode_mata_kuliah,
          "bekasi"
        ) as string,
      },
    });

    // hitung IPK dan jumlah SKS
    const allNilai = await prisma.nilai.findMany({
      where: {
        nim: rc4ModifiedEncrypt(nimMahasiswa, "bekasi") as string,
      },
      include: {
        MataKuliah: true,
      },
    });

    let totalSks = 0;
    let totalNilai = 0;

    if (allNilai.length > 0) {
      allNilai.forEach((nilai) => {
        const sks = parseInt(
          rc4ModifiedDecrypt(nilai.MataKuliah.sks, "bekasi") as string
        );

        const nilaiAngka =
          INDEKS[
            rc4ModifiedDecrypt(nilai.nilai, "bekasi") as keyof typeof INDEKS
          ];

        totalSks += sks;
        totalNilai += sks * nilaiAngka;
      });
    }

    const ipk = totalNilai / totalSks;

    await prisma.mahasiswa.update({
      where: {
        nim: rc4ModifiedEncrypt(nimMahasiswa, "bekasi") as string,
      },
      data: {
        ipk: rc4ModifiedEncrypt(ipk.toString(), "bekasi") as string,
        jumlah_sks: rc4ModifiedEncrypt(totalSks.toString(), "bekasi") as string,
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
