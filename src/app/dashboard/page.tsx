import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="flex w-full p-10 sm:items-center sm:gap-5">
        <h1 className="text-5xl font-bold font-white">Dashboard</h1>
        <hr className="hidden sm:flex sm:flex-grow sm:border-b sm:border-[var(--gray)]" />
      </header>
      <main className="grid grid-cols-1 gap-5 p-5">
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
              Valor do inventário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-extrabold text-white text-7xl">R$ 2.000</h2>
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
      </main>
    </div>
  );
}
