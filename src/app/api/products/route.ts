import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, category, brand, size, quantity, price } = await request.json();

    if (!name || !category || !brand || !size) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }
    if (typeof quantity !== "number" || quantity < 0) {
      return NextResponse.json(
        { error: "Quantidade inválida" },
        { status: 400 }
      );
    }
    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Preço inválido" },
        { status: 400 }
      );
    }

    let categoryObj = await prisma.category.findUnique({
      where: { name: category },
    });
    if (!categoryObj) {
      categoryObj = await prisma.category.create({ data: { name: category } });
    }

    let brandObj = await prisma.brand.findUnique({
      where: { name: brand },
    });
    if (!brandObj) {
      brandObj = await prisma.brand.create({ data: { name: brand } });
    }

    const product = await prisma.product.create({
      data: {
        name,
        size,
        quantity,
        price,
        categoryId: categoryObj.id,
        brandId: brandObj.id,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: "asc" },
      include: {
        category: true,
        brand: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
