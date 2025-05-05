"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination } from "../Pagination/Pagination";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  size: string;
  quantity: number;
  price: number;
}

interface InventoryTableProps {
  data: Product[];
  itemsPerPage: number;
  enablePagination?: boolean;
}

export default function InventoryTable({
  data,
  itemsPerPage,
  enablePagination = true,
}: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-4 col-span-4">
      <Table>
        <TableHeader className="hidden lg:table-header-group">
          <TableRow className="text-xl">
            {[
              "Produto",
              "Categoria",
              "Marca",
              "Tamanho",
              "Quantidade",
              "Preço",
              "Ações",
            ].map((header) => (
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
          {paginatedData.map((product) => (
            <TableRow
              key={product.id}
              className="flex flex-col text-xl mb-10 border-0 lg:table-row"
            >
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] bg-[var(--gray-dark)] rounded-md px-5 py-10 lg:table-cell lg:bg-transparent">
                <span className="font-bold lg:hidden">Produto:</span>
                {product.name}
              </TableCell>
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                <span className="font-semibold lg:hidden">Categoria:</span>
                {product.category}
              </TableCell>
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                <span className="font-semibold lg:hidden">Marca:</span>
                {product.brand}
              </TableCell>
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                <span className="font-semibold lg:hidden">Tamanho:</span>
                {product.size.toUpperCase()}
              </TableCell>
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                <span className="font-semibold lg:hidden">Quantidade:</span>
                {product.quantity}
              </TableCell>
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                <span className="font-semibold lg:hidden">Preço:</span>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                <span className="font-semibold lg:hidden">Ações:</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="text-[var(--gray-dark)] cursor-pointer"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="text-white cursor-pointer"
                  >
                    Excluir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {enablePagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
