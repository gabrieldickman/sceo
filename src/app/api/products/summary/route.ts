import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const totalProductsCount = await prisma.product.aggregate({
      _sum: { quantity: true },
    });

    const lowStockCount = await prisma.product.count({
      where: { quantity: { lt: 5, gt: 0 } }, // opcional para ignorar 0
    });

    const zeroStockCount = await prisma.product.count({
      where: { quantity: 0 },
    });

    const totalInventoryValueResult = await prisma.$queryRaw<
      { total: number }[]
    >`SELECT COALESCE(SUM(price * quantity), 0) as total FROM "Product"`;

    const totalInventoryValue = totalInventoryValueResult[0]?.total || 0;

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
