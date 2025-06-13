"use client";

import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import type { Control, UseFormSetValue } from "react-hook-form";

type ProductOption = {
  id: number;
  name: string;
  price: number;
};

type SalesComboboxProps = {
  name: string;
  label: string;
  control: Control<any>;
  options: ProductOption[];
  setValue: UseFormSetValue<any>;
};

export function SalesCombobox({
  name,
  label,
  control,
  options,
  setValue,
}: SalesComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-5">
          <label className="text-white text-2xl">{label}</label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="p-8 rounded-lg cursor-pointer">
              <Button
                role="combobox"
                className="w-full justify-between text-white text-xl bg-[var(--gray-dark)] border border-[var(--gray)]"              >
                {field.value
                  ? options.find((opt) => opt.id === field.value)?.name
                  : "Selecione um produto"}
                <ChevronsUpDown className="!w-6 !h-6" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className=" bg-[var(--gray-dark)] text-2xl w-110">
              <Command className="bg-[var(--gray-dark)] text-white">
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Buscar produto..."
                  className="text-white placeholder:text-white text-2xl"
                />
                <CommandEmpty className="flex items-center justify-between p-5 mb-5 text-white text-2xl">Nenhum produto encontrado.</CommandEmpty>
                <CommandGroup className="bg-[var(--gray-dark)]">
                  {filtered.map((opt) => (
                    <CommandItem
                      className="text-xl text-white mb-5 mt-5 cursor-pointer"
                      key={opt.id}
                      value={opt.name}
                      onSelect={() => {
                        field.onChange(opt.id);
                        setValue("selectedProduct", opt);
                        setOpen(false);
                      }}
                    >
                      {opt.name} — R$ {opt.price.toFixed(2)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
