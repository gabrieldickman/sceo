import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NotificationsCard from "@/components/NotificationsCard";
import InventoryTable from "@/components/InventoryTable";
import { prisma } from "@/lib/prisma";
import TopProductsCard from "@/components/TopProducts";
import { Product } from "@/types/product";
import { getInventoryStats } from "@/helpers/DashboardStatsCards/inventoryStats";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if(!userId){
    redirect("/sign-in")
  }

  const sales = await prisma.sale.findMany({
    where: { userId },
    include: {
      product: true,
    },
    orderBy: { saleDate: "desc" },
  });

  const productList = await prisma.product.findMany({
    where: { userId },
    include: {
      category: true,
      brand: true,
    },
    orderBy: { name: "asc" },
  });

  const products: Product[] = productList.map((product) => ({
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    size: product.size,
    categoryId: product.category.id,
    brandId: product.brand.id,
    category: product.category.name,
    brand: product.brand.name,
    userId: product.userId,
  }));

  const { totalProducts, lowStockCount, zeroStockCount, totalInventoryValue } =
    getInventoryStats(products);

  const StatsCards = ( title: string, value: string | number, color = "var(--black-primary)" ) => (
    <Card className={`bg-[${color}] h-60 rounded-xl border-[var(--gray)]`}>
      <CardHeader>
        <CardTitle className="font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="font-extrabold text-white text-7xl">{value}</h2>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex w-full p-10 sm:items-center sm:gap-5">
        <h1 className="text-5xl font-bold text-white">Dashboard</h1>
        <hr className="hidden sm:flex sm:flex-grow sm:border-b sm:border-[var(--gray)]" />
      </header>

      <main className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 xl:grid-cols-4">
        {StatsCards("Total de Produtos", totalProducts)}
        {StatsCards("Produtos com estoque baixo", lowStockCount)}
        {StatsCards("Produtos com estoque zerado", zeroStockCount)}
        {StatsCards(
          "Valor do Estoque",
          totalInventoryValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          "var(--gray-dark)"
        )}

        <NotificationsCard />

        {sales.length === 0 ? (
          <Card className="bg-[var(--black-secondary)] rounded-xl border-[var(--gray)] overflow-y-auto h-120 xl:col-span-2">
            <CardContent className="h-full flex items-center justify-center text-white p-0">
              <div className="flex items-center justify-center h-full">
                <p>Nenhum produto cadastrado no banco de dados</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <TopProductsCard />
        )}

        <Card className="bg-[var(--black-primary)] rounded-xl border-[var(--gray)] sm:col-span-2 xl:col-span-4 h-150">
          <CardContent className="text-white p-0 h-full overflow-y-auto">
            {products.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p>Nenhum produto cadastrado no banco de dados</p>
              </div>
            ) : (
              <InventoryTable
                data={products}
                itemsPerPage={5}
                enablePagination
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
