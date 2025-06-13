import { useEffect, useState } from "react";

export interface Sale {
  id: string;
  quantity: number;
  totalPrice: number;
  saleDate: string;
  product: {
    name: string;
  };
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("/api/sales");
        if (!res.ok) throw new Error("Erro ao buscar vendas");
        const data = await res.json();
        setSales(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return { sales, loading };
}
