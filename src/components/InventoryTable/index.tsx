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
import { ExternalLink, Trash2 } from "lucide-react";
import { Products } from "@/mocks/all-products";
import { getStatus } from "@/helpers/InventoryTable/getStatus";

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

  const inventoryTotalValue = Products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

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
              "Status",
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
          {paginatedData.map((product) => {
            const status = getStatus(product.quantity);
            const rowClass = status === "Indisponível" ? "bg-[var(--red)]" : "";
            return (
              <TableRow
                key={product.id}
                className={`flex flex-col text-xl mb-10 border-0 lg:table-row ${rowClass}`}
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
                  <span className="font-semibold lg:hidden">Status:</span>
                  {status}
                </TableCell>
                <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                  <span className="font-semibold lg:hidden">Ações:</span>
                  <div className="flex gap-5">
                    <Button
                      variant={"ghost"}
                      className="bg-[var(--black-primary)] cursor-pointer"
                    >
                      <ExternalLink size={48} />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="bg-[var(--black-primary)] cursor-pointer"
                    >
                      <Trash2 size={24} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {enablePagination && totalPages > 1 && (
        <div className="flex justify-between items-center mx-5 mt-3">
          <span className="text-white font-semibold text-xl">
            Valor total do inventário:{" "}
            {inventoryTotalValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
