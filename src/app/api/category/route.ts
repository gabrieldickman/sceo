import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
  }

  const existing = await prisma.category.findFirst({ where: { name } });

  if (existing) {
    return NextResponse.json(existing);
  }

  const category = await prisma.category.create({ data: { name } });
  return NextResponse.json(category);
}
