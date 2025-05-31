import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, category, brand, size, quantity, price } = await req.json();

  const categoryObj = await prisma.category.findUnique({
    where: { name: category },
  });
  const brandObj = await prisma.brand.findUnique({
    where: { name: brand },
  });

  if (!categoryObj || !brandObj) {
    return NextResponse.json(
      { error: "Categoria ou marca inválida" },
      { status: 400 }
    );
  }

  const updated = await prisma.product.update({
    where: { id: Number(params.id) },
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


export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ success: true });
}
