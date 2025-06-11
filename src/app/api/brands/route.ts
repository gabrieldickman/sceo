import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server"; 
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const brands = await prisma.brand.findMany({
    where: { userId }
  });

  return NextResponse.json(brands);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
  }

  const existing = await prisma.brand.findFirst({
    where: { name, userId },
  });

  if (existing) {
    return NextResponse.json(existing);
  }

  const brand = await prisma.brand.create({
    data: { name, userId },
  });

  return NextResponse.json(brand);
}
