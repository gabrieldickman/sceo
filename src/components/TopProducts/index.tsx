"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSales } from "@/hooks/useSales";

export default function TopProductsCard() {
  const { sales, loading } = useSales();

  return (
    <Card className="bg-[var(--black-secondary)] rounded-xl border-[var(--gray)] overflow-y-auto h-120 xl:col-span-2">
      <CardContent className="text-white p-0">
        <CardHeader className="p-5">
          <CardTitle className="text-xl font-normal">
            Últimas vendas realizadas
          </CardTitle>
        </CardHeader>

        <Table>
          <TableHeader className="hidden lg:table-header-group">
            <TableRow className="text-xl">
              {["Produto", "Quantidade", "Valor", "Data"].map((header) => (
                <TableHead
                  key={header}
                  className="text-white font-normal p-5 border-t border-b border-[var(--gray)] bg-[var(--gray-dark)]"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-2xl">
                  Nenhuma venda encontrada.
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow
                  key={sale.id}
                  className="flex flex-col text-xl mb-10 border-0 lg:table-row hover:bg-transparent"
                >
                  <TableCell className="flex justify-between items-center border-b border-[var(--gray)] bg-[var(--gray-dark)] rounded-md px-5 py-10 lg:table-cell lg:bg-transparent">
                    <span className="font-bold lg:hidden">Produto:</span>
                    {sale.product.name}
                  </TableCell>

                  <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                    <span className="font-semibold lg:hidden">Quantidade:</span>
                    {sale.quantity}
                  </TableCell>

                  <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                    <span className="font-semibold lg:hidden">Valor:</span>
                    {sale.totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>

                  <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                    <span className="font-semibold lg:hidden">Data:</span>
                    {new Date(sale.saleDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
