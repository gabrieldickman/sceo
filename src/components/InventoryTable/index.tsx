"use client";

import { useState, useMemo } from "react";
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
import { getStatus } from "@/helpers/InventoryTable/getStatus";

type SimpleProduct = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  size: string;
  categoryId: number;
  brandId: number;
  category: string;
  brand: string;
};

type InventoryTableProps = {
  data: SimpleProduct[];
  itemsPerPage: number;
  enablePagination?: boolean;
  onEdit?: (product: SimpleProduct) => void;
  onDelete?: (id: number) => void;
};

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

function ActionsCell({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-5">
      <Button
        variant="ghost"
        className="bg-[var(--black-primary)] cursor-pointer w-auto h-auto"
        aria-label="Editar produto"
        onClick={onEdit}
      >
        <ExternalLink className="!w-6 !h-6" />
      </Button>
      <Button
        variant="ghost"
        className="bg-[var(--black-primary)] cursor-pointer w-auto h-auto"
        aria-label="Deletar produto"
        onClick={onDelete}
      >
        <Trash2 className="!w-6 !h-6" />
      </Button>
    </div>
  );
}

export default function InventoryTable({
  data,
  itemsPerPage,
  enablePagination = true,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const inventoryTotalValue = useMemo(() => {
    return data.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [data]);

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
            const rowClass =
              status === "Indisponível"
                ? "bg-[var(--red)] hover:bg-[var(--red)]"
                : "";

            return (
              <TableRow
                key={product.id}
                className={`flex flex-col text-xl mb-10 border-0 lg:table-row hover:bg-transparent ${rowClass}`}
              >
                <ResponsiveTableCell
                  label="Produto"
                  className="rounded-md px-5 py-10 lg:bg-transparent border-b border-[var(--gray)] bg-[var(--gray-dark)] font-bold"
                >
                  {product.name}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Categoria">
                  {product.category}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Marca">
                  {product.brand}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Tamanho">
                  {product.size.toUpperCase()}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Quantidade">
                  {product.quantity}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Preço">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Status">
                  {status}
                </ResponsiveTableCell>
                <ResponsiveTableCell label="Ações">
                  <ActionsCell
                    onEdit={() => onEdit?.(product)}
                    onDelete={() => onDelete?.(product.id)}
                  />
                </ResponsiveTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mx-5 mt-3">
        <span className="text-white font-semibold text-xl">
          Valor do Estoque:{" "}
          {inventoryTotalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        {enablePagination && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
