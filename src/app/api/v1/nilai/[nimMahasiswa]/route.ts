import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { nimMahasiswa: string } }
) {
  const data = await req.json();

  const { nimMahasiswa } = params;
  const { nilai, kode_mata_kuliah } = data;

  try {
    const newNilai = await prisma.nilai.create({
      data: {
        nilai,
        kode_mata_kuliah,
        nim: nimMahasiswa,
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
