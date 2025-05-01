import { Dot } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function NotificationsCard() {
  return (
    <Card className="bg-[var(--black-primary)] h-120 rounded-xl border-[var(--gray)] xl:col-span-2">
      <CardContent className="w-full flex flex-col overflow-auto">
        <span className="flex flex-row items-center">
          <Dot size={48} color="#55b02e" />
          <p className="text-white text-xl">
            Foram adicionadas 5 unidades de <span className="text-[#FFCC00]">NOME PRODUTO</span>
          </p>
        </span>
        <hr />
        <span className="flex flex-row items-center">
          <Dot size={48} color="#E93030" />
          <p className="text-white text-xl">
            Produto <span className="text-[#FFCC00]">NOME PRODUTO</span> está quase esgotado!
          </p>
        </span>
        <hr />
        <span className="flex flex-row items-center">
          <Dot size={48} color="#2240D2" />
          <p className="text-white text-xl">
            Novo produto cadastrado: <span className="text-[#FFCC00]">NOME PRODUTO</span>
          </p>
        </span>
        <hr />
        <span className="flex flex-row items-center">
          <Dot size={48} color="#E93030" />
          <p className="text-white text-xl">
            Produto <span className="text-[#FFCC00]">NOME PRODUTO</span> está quase esgotado!
          </p>
        </span>
        <hr />
        <span className="flex flex-row items-center">
          <Dot size={48} color="#55b02e" />
          <p className="text-white text-xl">
            Foram adicionadas 10 unidades de <span className="text-[#FFCC00]">NOME PRODUTO</span>
          </p>
        </span>
      </CardContent>
    </Card>
  );
}
