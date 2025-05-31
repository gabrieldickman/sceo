import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Combobox } from "../Combobox";
import { useEffect, useState } from "react";

interface UpsertProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  brand: z.string().min(1, "Marca é obrigatória"),
  size: z.string().min(1, "Tamanho obrigatório"),
  quantity: z.coerce.number().int().min(0, "Quantidade inválida"),
  price: z.coerce.number().min(0.01, "Preço inválido"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function UpsertProductDialog({
  open,
  onOpenChange,
}: UpsertProductDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      quantity: 0,
      price: 0,
    },
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const availableSizes = ["P", "M", "G", "GG"];

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetch("/api/category"),
          fetch("/api/brand"),
        ]);

        if (!categoriesRes.ok || !brandsRes.ok) {
          throw new Error("Erro ao buscar categorias ou marcas");
        }

        const categoriesData = await categoriesRes.json();
        const brandsData = await brandsRes.json();

        setAvailableCategories(categoriesData.map((cat: any) => cat.name));
        setAvailableBrands(brandsData.map((brand: any) => brand.name));
      } catch (error) {
        console.error("Erro ao carregar categorias e marcas:", error);
      }
    }

    if (open) {
      fetchData();
    }
  }, [open]);

  function handleCreateCategory(newCategory: string) {
    setAvailableCategories((prev) =>
      prev.includes(newCategory) ? prev : [...prev, newCategory]
    );
  }

  function handleCreateBrand(newBrand: string) {
    setAvailableBrands((prev) =>
      prev.includes(newBrand) ? prev : [...prev, newBrand]
    );
  }

  async function onSubmit(data: ProductFormData) {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao salvar produto");

      const result = await response.json();
      console.log("Produto cadastrado com sucesso:", result);

      onOpenChange(false);
      reset();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto");
    }
  }

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--gray-dark)] flex flex-col gap-5 w-full h-auto border-0 p-10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-white text-center">
            Cadastrar Produto
          </DialogTitle>
          <p className="text-center text-xl text-[var(--gray)]">
            Insira as informações abaixo
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-5">
            <Label className="text-white text-2xl">Nome</Label>
            <input
              placeholder="Informe o nome do produto..."
              {...register("name")}
              className="w-full p-4 rounded-lg bg-[var(--gray-dark)] border border-[var(--gray)] text-white text-xl placeholder:text-white"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <Combobox
            control={control}
            name="category"
            label="Categoria"
            options={availableCategories}
            setValue={setValue}
            placeholder="Selecione"
            onCreate={handleCreateCategory}
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <Combobox
            control={control}
            name="brand"
            label="Marca"
            options={availableBrands}
            setValue={setValue}
            placeholder="Selecione"
            onCreate={handleCreateBrand}
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}

          <div className="flex flex-col gap-5">
            <Label className="text-white text-2xl">Tamanho</Label>
            <select
              {...register("size")}
              className="w-full p-4 rounded-lg bg-[var(--gray-dark)] border border-[var(--gray)] text-white text-xl"
            >
              <option value="">Selecione</option>
              {availableSizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.size && (
              <p className="text-red-500">{errors.size.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <Label className="text-white text-2xl">Quantidade</Label>
            <input
              type="number"
              {...register("quantity")}
              className="w-full p-4 rounded-lg bg-[var(--gray-dark)] border border-[var(--gray)] text-white text-xl"
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <Label className="text-white text-2xl">Preço</Label>
            <div className="flex flex-row gap-2 items-center">
              <p>R$</p>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                className="w-full p-4 rounded-lg bg-[var(--gray-dark)] border border-[var(--gray)] text-white text-xl"
              />
            </div>
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              variant={"ghost"}
              className="w-full h-15 bg-[var(--green)] text-white text-2xl cursor-pointer"
            >
              Salvar Produto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
