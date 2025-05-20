import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { topProducts } from "@/mocks/top-products";

export default function TopProductsCard() {
  return (
    <Card className="bg-[var(--black-secondary)] rounded-xl border-[var(--gray)] overflow-y-auto h-120 xl:col-span-2">
      <CardContent className="text-white p-0">
        <CardHeader className="p-5">
          <CardTitle className="text-xl font-normal">
            Produtos mais vendidos
          </CardTitle>
        </CardHeader>

        <Table>
          <TableHeader className="hidden lg:table-header-group">
            <TableRow className="text-xl">
              {["Produto", "Marca", "Categoria", "Tamanho", "Preço"].map((header) => (
                <TableHead key={header} className="text-white font-normal p-5 border-t border-b border-[var(--gray)] bg-[var(--gray-dark)]">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {topProducts.map((product) => (
              <TableRow
                key={product.id}
                className="flex flex-col text-xl mb-10 border-0 lg:table-row hover:bg-transparent"
              >
                <TableCell className="flex justify-between items-center border-b border-[var(--gray)] bg-[var(--gray-dark)] rounded-md px-5 py-10 lg:table-cell lg:bg-transparent">
                  <span className="font-bold lg:hidden">Produto:</span>
                  {product.name}
                </TableCell>

                <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                  <span className="font-semibold lg:hidden">Marca:</span>
                  {product.brand}
                </TableCell>

                <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                  <span className="font-semibold lg:hidden">Categoria:</span>
                  {product.category}
                </TableCell>

                <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                  <span className="font-semibold lg:hidden">Tamanho:</span>
                  {product.size.toUpperCase()}
                </TableCell>

                <TableCell className="flex justify-between items-center border-b border-[var(--gray)] p-4 lg:table-cell">
                  <span className="font-semibold lg:hidden">Preço:</span>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
