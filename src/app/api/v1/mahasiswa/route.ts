import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = 'default-no-store';

export async function GET(req: NextRequest) {
  try {
    const allMahasiswa = await prisma.mahasiswa.findMany();
    return NextResponse.json(
      { message: "All mahasiswa retrieved successfully", allMahasiswa },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving mahasiswa:", error);
    return NextResponse.json(
      { error: "Error retrieving mahasiswa" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { nim, nama, jumlah_sks, ipk, tanda_tangan } = data;

  try {
    const mahasiswa = await prisma.mahasiswa.create({
      data: {
        nim,
        nama,
        jumlah_sks,
        ipk,
        tanda_tangan,
      },
    });

    return NextResponse.json(
      { message: "Mahasiswa created successfully", mahasiswa },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mahasiswa:", error);
    return NextResponse.json(
      { error: "Error creating mahasiswa" },
      { status: 500 }
    );
  }
}
