import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const totalProductsCount = await prisma.product.aggregate({
      where: { userId },
      _sum: { quantity: true },
    });

    const lowStockCount = await prisma.product.count({
      where: { userId, quantity: { lt: 5, gt: 0 } },
    });

    const zeroStockCount = await prisma.product.count({
      where: { userId, quantity: 0 },
    });

    const totalInventoryValueResult = await prisma.product.aggregate({
      where: { userId },
      _sum: {
        price: true, 
      },
      _count: true,
    });


    const products = await prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true },
    });

    const totalInventoryValue = products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    return NextResponse.json({
      totalProducts: totalProductsCount._sum.quantity || 0,
      lowStockCount,
      zeroStockCount,
      totalInventoryValue,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do inventário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados do inventário" },
      { status: 500 }
    );
  }
}
