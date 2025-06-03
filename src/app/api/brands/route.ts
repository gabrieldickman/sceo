import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server"; 

export async function GET() {
  const brands = await prisma.brand.findMany();
  return NextResponse.json(brands);
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
  }

  const existing = await prisma.brand.findUnique({ where: { name } });

  if (existing) {
    return NextResponse.json(existing);
  }

  const brand = await prisma.brand.create({ data: { name } });
  return NextResponse.json(brand);
}
