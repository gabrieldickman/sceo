import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const product = await prisma.product.findFirst({
    where: { id: productId, userId },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

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
    where: {
      name_userId: {
        name: category,
        userId,
      },
    },
    update: {},
    create: {
      name: category,
      userId,
    },
  });

  const brandObj = await prisma.brand.upsert({
    where: {
      name_userId: {
        name: brand,
        userId,
      },
    },
    update: {},
    create: {
      name: brand,
      userId,
    },
  });

  const updated = await prisma.product.updateMany({
    where: { id: productId, userId },
    data: {
      name,
      size,
      quantity,
      price,
      categoryId: categoryObj.id,
      brandId: brandObj.id,
    },
  });

  if (updated.count === 0) {
    return NextResponse.json(
      { error: "Produto não encontrado ou não autorizado" },
      { status: 404 }
    );
  }

  // Busca o produto atualizado para retornar
  const product = await prisma.product.findFirst({
    where: { id: productId, userId },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id: productId, userId },
      data: { isDeleted: true },
    });
    
    if (!updated) {
      return NextResponse.json(
        { error: "Produto não encontrado ou não autorizado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json(
      { error: "Erro ao deletar item" },
      { status: 500 }
    );
  }
}
