import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SalesCombobox } from "../SalesCombobox";

const saleSchema = z.object({
  productId: z.coerce.number({ required_error: "Produto obrigatório" }),
  quantity: z.coerce.number().min(1, "Mínimo 1 unidade"),
  totalPrice: z.coerce.number().min(0.01),
  selectedProduct: z
    .object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
    })
    .optional(),
});

type SaleForm = z.infer<typeof saleSchema>;

interface saleDialogProps {
  openDialog: boolean;
  closeDialog: (open: boolean) => void;
  products: {
    id: number;
    name: string;
    price: number;
  }[];
}

export default function SaleDialog({
  openDialog,
  closeDialog,
  products,
}: saleDialogProps) {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SaleForm>({
    resolver: zodResolver(saleSchema),
  });

  const quantity = watch("quantity");
  const selectedProduct = watch("selectedProduct");

  useEffect(() => {
  if (!openDialog) {
    reset();
  }
}, [openDialog, reset]);

  useEffect(() => {
    if (selectedProduct && quantity) {
      const total = selectedProduct.price * quantity;
      setValue("totalPrice", total);
    }
  }, [selectedProduct, quantity, setValue]);

  async function onSubmit(data: SaleForm) {
    const { productId, quantity, totalPrice } = data;

    await fetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({
        productId,
        quantity,
        totalPrice,
      }),
    });

    closeDialog(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="bg-[var(--black-secondary)]">
        <DialogHeader>
          <DialogTitle>Nova Venda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SalesCombobox
            name="productId"
            label="Produto"
            control={control}
            options={products}
            setValue={setValue}
          />

          <div className="flex flex-col gap-2">
            <Label className="text-white text-2xl">Quantidade</Label>
            <Input
              type="number"
              placeholder="Informe a quantidade..."
              {...register("quantity")}
              className="text-white text-xl bg-[var(--gray-dark)] border border-[var(--gray)]"
            />
            {errors.quantity && (
              <span className="text-red-400">{errors.quantity.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-white text-2xl">Valor total</Label>
            <Input
              type="number"
              readOnly
              {...register("totalPrice")}
              className="text-white text-xl bg-[var(--gray-dark)] border border-[var(--gray)]"
            />
          </div>

          <footer className="pt-4">
            <Button
              type="submit"
              variant={"ghost"}
              className="bg-[var(--green)] cursor-pointer"
            >
              Salvar
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
