import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const allMahasiswa = await prisma.mahasiswa.findMany({
            include: {
                Nilai: {
                    include: {
                        MataKuliah: true,
                    },
                },
            },
        });
        return NextResponse.json(
            { message: "Mahasiswa retrieved successfully", allMahasiswa },
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