"use client";

import { useState, useEffect, useMemo } from "react";
import InventoryTable from "@/components/InventoryTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UpsertProductDialog from "@/components/UpsertProductDialog";
import { Product } from "@prisma/client";
import { useDebounce } from "@/hooks/useDebounce";

type ProductWithRelations = Product & {
  category: { id: number; name: string };
  brand: { id: number; name: string };
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data: ProductWithRelations[] = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setProductToEdit(null);
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
  await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  fetchProducts();
};


  const adaptedProducts = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      size: product.size,
      categoryId: product.category?.id ?? 0,
      category: product.category?.name ?? "Sem categoria",
      brandId: product.brand?.id ?? 0,
      brand: product.brand?.name ?? "Sem marca",
      userId: product.userId,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const lowerSearch = debouncedSearch.toLowerCase();
    return adaptedProducts.filter((product) =>
      `${product.name} ${product.category} ${product.brand} ${product.size}`
        .toLowerCase()
        .includes(lowerSearch)
    );
  }, [adaptedProducts, debouncedSearch]);

  return (
    <div
      className={`w-full h-full flex flex-col ${
        dialogOpen ? "bg-black opacity-25" : ""
      }`}
    >
      <header className="flex w-full p-10 sm:items-center sm:gap-5">
        <h1 className="text-5xl font-bold text-white">Inventário</h1>
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
            variant="ghost"
            className="text-3xl text-white cursor-pointer w-100 h-15 font-bold bg-[var(--green)]"
            onClick={() => {
              setProductToEdit(null);
              setDialogOpen(true);
            }}
          >
            + Cadastrar Produto
          </Button>
        </div>

        <div className="h-full overflow-auto">
          <InventoryTable
            data={filteredProducts}
            itemsPerPage={10}
            enablePagination
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <UpsertProductDialog
          open={dialogOpen}
          onOpenChange={handleDialogChange}
          productIdToEdit={productToEdit ? productToEdit.id : null}
        />
      </main>
    </div>
  );
}
