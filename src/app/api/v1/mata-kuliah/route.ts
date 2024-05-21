import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { kode_mata_kuliah, nama_mata_kuliah, sks } = data;

  try {
    const mataKuliah = await prisma.mataKuliah.create({
      data: {
        kode_mata_kuliah,
        nama_mata_kuliah,
        sks,
      },
    });

    return NextResponse.json(
      { message: "Mata kuliah created successfully", mataKuliah },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mata kuliah:", error);
    return NextResponse.json(
      { error: "Error creating mata kuliah" },
      { status: 500 }
    );
  }
}
