import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: any  
) {
  const id = parseInt(context.params.id, 10);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  context: any
) {
  const id = parseInt(context.params.id, 10);
  const { name, category, brand, size, quantity, price } = await req.json();

  if (
    !name ||
    !category ||
    !brand ||
    !size ||
    quantity == null ||
    price == null
  ) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const categoryObj = await prisma.category.upsert({
    where: { name: category },
    update: {},
    create: { name: category },
  });

  const brandObj = await prisma.brand.upsert({
    where: { name: brand },
    update: {},
    create: { name: brand },
  });

  const updated = await prisma.product.update({
    where: { id },
    data: {
      name,
      size,
      quantity,
      price,
      categoryId: categoryObj.id,
      brandId: brandObj.id,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  context: any
) {
  try {
    const id = parseInt(context.params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json({ error: "Erro ao deletar item" }, { status: 500 });
  }
}
