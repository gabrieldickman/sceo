import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


function validateFields({ name, category, brand, size, quantity, price }: any) {
  if (!name || !category || !brand || !size) {
    return "Campos obrigatórios faltando";
  }
  if (typeof quantity !== "number" || quantity < 0) {
    return "Quantidade inválida";
  }
  if (typeof price !== "number" || price < 0) {
    return "Preço inválido";
  }
  return null;
}

async function findOrCreateByName(
  model: "category" | "brand",
  name: string,
  userId: string
) {
  if (model === "category") {
    const existing = await prisma.category.findUnique({
      where: { name_userId: { name, userId } },
    });
    if (existing) return existing;

    return prisma.category.create({
      data: { name, userId },
    });
  }

  if (model === "brand") {
    const existing = await prisma.brand.findUnique({
      where: { name_userId: { name, userId } },
    });
    if (existing) return existing;

    return prisma.brand.create({
      data: { name, userId },
    });
  }

  throw new Error("Modelo inválido");
}


export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const error = validateFields(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { name, category, brand, size, quantity, price } = body;

    const categoryObj = await findOrCreateByName("category", category, userId);
    const brandObj = await findOrCreateByName("brand", brand, userId);

    const product = await prisma.product.create({
      data: {
        name,
        size,
        quantity,
        price,
        categoryId: categoryObj.id,
        brandId: brandObj.id,
        userId,
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
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      where: { userId, isDeleted: false, },
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
