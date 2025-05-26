"use client";

import InventoryTable from "@/components/InventoryTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Products } from "@/mocks/all-products";
import { useState } from "react";
import UpsertProduct from "@/components/UpsertProductDialog";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProducts = Products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`w-full h-full flex flex-col ${
        dialogOpen ? "bg-black opacity-25" : ""
      }`}
    >
      <header className="flex w-full p-10 sm:items-center sm:gap-5">
        <h1 className="text-5xl font-bold font-white">Inventário</h1>
        <hr className="hidden sm:flex sm:flex-grow sm:border-b sm:border-[var(--gray)]" />
      </header>
      <main className="flex flex-col gap-5 px-10">
        <div className="flex flex-col justify-between items-start gap-5 sm:flex-row">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produto..."
            className="w-100 h-15 border-[var(--gray)] bg-[var(--gray-dark)] !text-xl"
          />
          <Button
            variant={"ghost"}
            className="text-3xl text-white cursor-pointer w-100 h-15 font-bold bg-[var(--green)]"
            onClick={() => setDialogOpen(true)}
          >
            + Cadastrar Produto
          </Button>
        </div>
        <div className="h-full overflow-auto">
          <InventoryTable
            data={filteredProducts}
            itemsPerPage={10}
            enablePagination
          />
        </div>
        <UpsertProduct open={dialogOpen} onOpenChange={setDialogOpen} />
      </main>
    </div>
  );
}


