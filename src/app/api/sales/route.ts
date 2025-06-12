import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const sales = await prisma.sale.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        saleDate: "desc",
      },
    });

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return new NextResponse("Erro ao buscar vendas", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const body = await req.json();
    const { productId, quantity, totalPrice } = body;

    const sale = await prisma.sale.create({
      data: {
        productId,
        quantity,
        totalPrice,
        userId,
      },
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    return new NextResponse("Erro ao registrar venda", { status: 500 });
  }
}
