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
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, PlusCircle } from "lucide-react";
import { FormField } from "@/components/ui/form";
import type { Control, UseFormSetValue } from "react-hook-form";

type ComboboxProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
  onCreate?: (value: string) => void;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
};

export function Combobox({
  name,
  label,
  placeholder,
  options,
  onCreate,
  control,
  setValue,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-5">
          <label className="text-2xl">{label}</label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="p-8 rounded-lg cursor-pointer">
              <Button
                role="combobox"
                className="w-full justify-between text-white text-xl bg-[var(--gray-dark)] border border-[var(--gray)]"
              >
                {field.value || placeholder || "Selecione"}
                <ChevronsUpDown className="!w-6 !h-6" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className=" bg-[var(--gray-dark)] text-2xl w-110">
              <Command className="bg-[var(--gray-dark)] text-white">
                <CommandInput
                  placeholder="Digite para buscar ou criar"
                  value={search}
                  onValueChange={(val) => setSearch(val)}
                  className="text-white placeholder:text-white text-2xl"
                />

                <CommandEmpty>
                  <div className="flex items-center justify-between p-5 mb-5 text-white text-2xl">
                    <span>Nenhuma {label} encontrada.</span>
                  </div>
                  <div className="bg-[var(--green)] hover:bg-transparent cursor-pointer">
                    <Button
                      variant="ghost"
                      className="w-full h-full p-5 justify-center gap-5 text-left text-2xl text-white cursor-pointer rounded-md"
                      onClick={() => {
                        field.onChange(search);
                        onCreate?.(search);
                        setOpen(false);
                      }}
                    >
                      <PlusCircle className="!w-6 !h-6" />
                      Criar nova {label}
                    </Button>
                  </div>
                </CommandEmpty>

                <CommandGroup className="bg-[var(--gray-dark)]">
                  {filteredOptions.map((option) => (
                    <CommandItem
                      className="text-xl text-white mb-5 mt-5 cursor-pointer"
                      key={option}
                      onSelect={() => {
                        field.onChange(option);
                        setOpen(false);
                      }}
                    >
                      {option}
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
