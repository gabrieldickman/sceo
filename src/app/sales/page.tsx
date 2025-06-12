"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SaleDialog from "@/components/SaleDialog";

export default function SalesPage() {
    const [saleDialogOpen, setSaleDialogOpen] = useState(false)
    const [products, setProducts] = useState<
        { id: number; name: string; price: number }[]
    >([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <header className="flex w-full p-10 sm:items-center sm:gap-5">
                <h1 className="text-5xl font-bold text-white">Relatório de Vendas</h1>
                <hr className="hidden sm:flex sm:flex-grow sm:border-b sm:border-[var(--gray)]" />
            </header>

            <main className="flex flex-col gap-5 px-10">
                <div className="flex justify-center sm:justify-end">
                    <Button
                        variant="ghost"
                        className="text-3xl text-white cursor-pointer w-100 h-15 font-bold bg-[var(--green)]"
                        onClick={() => { setSaleDialogOpen(true) }}
                    >
                        + Registrar Venda
                    </Button>

                    <SaleDialog
                        openDialog={saleDialogOpen}
                        closeDialog={() => setSaleDialogOpen(false)}
                        products={products}
                    />

                </div>

                <div className="h-full overflow-auto">

                </div>
            </main>
        </div>
    );
}
