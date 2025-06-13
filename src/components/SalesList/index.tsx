"use client";

import { useSales } from "@/hooks/useSales";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ResponsiveTableCell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TableCell
      className={`flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell ${className}`}
    >
      <span className="font-semibold lg:hidden">{label}:</span>
      {children}
    </TableCell>
  );
}

export default function SalesList() {
  const { sales, loading } = useSales();

  if (loading) {
    return <p className="text-gray-400">Carregando vendas...</p>;
  }

  if (sales.length === 0) {
    return <p className="text-gray-400">Nenhuma venda encontrada.</p>;
  }

  return (
    <div className="flex flex-col gap-4 col-span-4">
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
          {sales.map((sale) => (
            <TableRow
              key={sale.id}
              className="flex flex-col text-xl mb-10 border-0 lg:table-row hover:bg-transparent"
            >
              <ResponsiveTableCell
                label="Produto"
                className="rounded-md px-5 py-10 lg:bg-transparent border-b border-[var(--gray)] bg-[var(--gray-dark)] font-bold"
              >
                {sale.product.name}
              </ResponsiveTableCell>

              <ResponsiveTableCell label="Quantidade">
                {sale.quantity}
              </ResponsiveTableCell>

              <ResponsiveTableCell label="Valor">
                {sale.totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </ResponsiveTableCell>

              <ResponsiveTableCell label="Data">
                {new Date(sale.saleDate).toLocaleDateString("pt-BR")}
              </ResponsiveTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
