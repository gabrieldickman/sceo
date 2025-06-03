import { Product } from "@/types/product";

export const getInventoryStats = (products: Product[]) => {
  const totalProducts = products.length;

  const lowStockCount = products.filter(
    (product) => product.quantity <= 5 && product.quantity > 0
  ).length;

  const zeroStockCount = products.filter(
    (product) => product.quantity === 0
  ).length;

  const totalInventoryValue = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return {
    totalProducts,
    lowStockCount,
    zeroStockCount,
    totalInventoryValue,
  };
};
