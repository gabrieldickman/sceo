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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Products } from "@/mocks/all-products";
import { Combobox } from "../Combobox";
import { Ghost } from "lucide-react";
import { useEffect } from "react";

interface UpsertProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableCategories = Array.from(
  new Set(Products.map((product) => product.category))
);

const availableSizes = Array.from(
  new Set(Products.map((product) => product.size))
);

const availableBrands = Array.from(
  new Set(Products.map((product) => product.brand))
);

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z
    .string({
      required_error: "Categoria é obrigatória",
    })
    .min(1, "Categoria é obrigatória"),
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

  function onSubmit(data: ProductFormData) {
    console.log("Produto cadastrado:", data);
  }

  useEffect(() => {
    if (!open) {
      reset();
    }
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
