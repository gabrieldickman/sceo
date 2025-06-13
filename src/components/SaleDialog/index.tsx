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
      reset({
        quantity: 0,
        totalPrice: 0,
      });
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
      <DialogContent className="bg-[var(--gray-dark)] flex flex-col gap-5 w-full h-auto border-0 p-10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-white text-center">Nova Venda</DialogTitle>
          <p className="text-center text-xl text-[var(--gray)]">
            Registrar uma nova venda
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <SalesCombobox
            name="productId"
            label="Produto"
            control={control}
            options={products}
            setValue={setValue}
          />

          <div className="flex flex-col gap-5">
            <Label className="text-white text-2xl">Quantidade</Label>
            <Input
              className="w-full py-7 rounded-lg bg-[var(--gray-dark)] border border-[var(--gray)] text-white placeholder:text-xl placeholder:text-white !text-xl"
              type="number"
              placeholder="Informe a quantidade:"
              {...register("quantity")}
            />
            {errors.quantity && (
              <span className="text-red-400">{errors.quantity.message}</span>
            )}
          </div>


          <div className="flex flex-col gap-5">
            <Label className="text-white text-2xl">Valor total</Label>
            <div className="flex flex-row gap-2 items-center">
              <p>R$</p>
              <Input
                className="w-full py-7 rounded-lg bg-[var(--gray-dark)] border border-[var(--gray)] text-white !text-xl"
                type="number"
                readOnly
                {...register("totalPrice")}
              />
            </div>
          </div>

          <footer className="pt-4">
            <Button
              type="submit"
              variant={"ghost"}
              className="w-full h-15 bg-[var(--green)] text-white text-2xl cursor-pointer"
            >
              Registrar Venda
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
}
