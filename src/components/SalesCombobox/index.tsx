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
        <div className="flex flex-col gap-3">
          <label className="text-white text-2xl">{label}</label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                role="combobox"
                className="w-full justify-between text-white bg-[var(--gray-dark)] border border-[var(--gray)]"
              >
                {field.value
                  ? options.find((opt) => opt.id === field.value)?.name
                  : "Selecione um produto"}
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="bg-[var(--gray-dark)] w-full text-white">
              <Command>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Buscar produto..."
                  className="text-white"
                />
                <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((opt) => (
                    <CommandItem
                      key={opt.id}
                      value={opt.name}
                      onSelect={() => {
                        field.onChange(opt.id);
                        setValue("selectedProduct", opt); // salva o produto inteiro
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
