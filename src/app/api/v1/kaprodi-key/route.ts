import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET(req: NextRequest) {
  try {
    // newestKey is used to get the latest key from createdAt
    const newestKey = await prisma.keyKetuaProgramStudi.findFirst({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(
      { message: "Newest key retrieved successfully", newestKey },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving key:", error);
    return NextResponse.json(
      { error: "Error retrieving key" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { public_key_e, private_key_d, modulus_n } = data;

  try {
    const keyData = await prisma.keyKetuaProgramStudi.create({
      data: {
        public_key_e,
        private_key_d,
        modulus_n,
      },
    });

    return NextResponse.json(
      { message: "Key created successfully", keyData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating key:", error);
    return NextResponse.json({ error: "Error creating key" }, { status: 500 });
  }
}

