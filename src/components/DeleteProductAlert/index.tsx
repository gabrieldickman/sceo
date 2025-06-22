// components/ConfirmDeleteDialog.tsx
"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface DeleteProductAlertProps {
  onConfirm: () => void | Promise<void>;
  children: React.ReactNode;
}

export function DeleteProductAlert({
  onConfirm,
  children,
}: DeleteProductAlertProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-[var(--gray-dark)] flex flex-col gap-5 w-full h-auto border-0 p-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-4xl font-bold text-white text-center">
            Deletar Produto?
          </AlertDialogTitle>
          <p className="text-center text-xl text-red-500">
            Esta ação não poderá ser desfeita.
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center"> 
          <AlertDialogCancel
            disabled={loading}
            className="p-5 rounded-xl bg-[var(--gray-dark)] text-white text-xl cursor-pointer w-50 h-15"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className="p-6 rounded-xl bg-red-500 hover:bg-white! hover:text-black! text-white text-xl cursor-pointer w-50 h-15"
          >
            {loading ? "Excluindo..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
