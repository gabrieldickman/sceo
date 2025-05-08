import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NotificationsCard from "@/components/NotificationsCard";
import TopProductsCard from "@/components/TopProducts";
import InventoryTable from "@/components/InventoryTable";
import { Products } from "@/mocks/all-products";

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex w-full p-10 sm:items-center sm:gap-5">
        <h1 className="text-5xl font-bold font-white">Dashboard</h1>
        <hr className="hidden sm:flex sm:flex-grow sm:border-b sm:border-[var(--gray)]" />
      </header>
      <main className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-[var(--black-primary)] h-60 rounded-xl border-[var(--gray)]">
          <CardHeader>
            <CardTitle className="font-semibold text-white">
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-extrabold text-white text-7xl">300</h2>
          </CardContent>
        </Card>
        <Card className="bg-[var(--black-primary)] h-60 rounded-xl border-[var(--gray)]">
          <CardHeader>
            <CardTitle className="font-semibold text-white">
              Produtos com estoque baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-extrabold text-white text-7xl">10</h2>
          </CardContent>
        </Card>
        <Card className="bg-[var(--black-primary)] h-60 rounded-xl border-[var(--gray)]">
          <CardHeader>
            <CardTitle className="font-semibold text-white">
              Produtos com estoque zerado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-extrabold text-white text-7xl">5</h2>
          </CardContent>
        </Card>
        <Card className="bg-[var(--green-dark)] h-60 rounded-xl border-[var(--gray)]">
          <CardHeader>
            <CardTitle className="font-semibold text-white">
              Valor de vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-extrabold text-white text-7xl">R$ 450</h2>
          </CardContent>
        </Card>
        <NotificationsCard />
        <TopProductsCard />
        <Card className="bg-[var(--black-primary)] rounded-xl border-[var(--gray)] sm:col-span-2 xl:col-span-4">
          <CardContent className="text-white p-0">
            <InventoryTable
              data={Products}
              itemsPerPage={5}
              enablePagination={true}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
