import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ajuste o path se necessário

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    const totalProductsCount = await prisma.product.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const lowStockCount = await prisma.product.count({
      where: {
        quantity: {
          lt: 5,
        },
      },
    });

    const zeroStockCount = await prisma.product.count({
      where: {
        quantity: 0,
      },
    });

    const totalInventoryValue = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    return NextResponse.json({
      totalProducts: totalProductsCount._sum.quantity || 0,
      lowStockCount,
      zeroStockCount,
      totalInventoryValue,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados do inventário" },
      { status: 500 }
    );
  }
}
