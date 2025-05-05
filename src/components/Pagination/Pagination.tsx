// components/ui/pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end items-center gap-4 p-5">
      <Button onClick={handlePrev} disabled={currentPage === 1} className="cursor-pointer">
        <ChevronLeft />
      </Button>
      <span className="text-white">
        Página {currentPage} de {totalPages}
      </span>
      <Button onClick={handleNext} disabled={currentPage === totalPages} className="cursor-pointer">
        <ChevronRight />
      </Button>
    </div>
  );
}
