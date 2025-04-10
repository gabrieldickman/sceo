"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/Logo-minimalist-white.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loggeduser from "@/components/Loggeduser";

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    `text-left px-2 py-1 rounded-md transition ${
      pathname === path
        ? "bg-[var(--green)] text-white font-bold"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <aside>
      <div className="hidden sm:flex">
        <nav className="flex flex-col justify-between p-5 w-80 h-screen bg-[var(--black-secondary)] ">
          <div className="flex flex-col gap-10">
            <div>
              <Image src={Logo} alt="Logo do SCEO" className="w-50 p-5" />
            </div>
            <div>
              <nav>
                <ul className="flex flex-col gap-10 w-full">
                  <Link href={"/dashboard"} className={linkStyle("/dashboard")}>
                    <li>Dashboard</li>
                  </Link>
                  <Link href={"/inventory"} className={linkStyle("/inventory")}>
                    <li>Inventário</li>
                  </Link>
                  <Link
                    href={"/transactions"}
                    className={linkStyle("/transactions")}
                  >
                    <li>Movimentações do Estoque</li>
                  </Link>
                </ul>
              </nav>
            </div>
          </div>
          <div>
            <Loggeduser />
          </div>
        </nav>
      </div>

      <div className="flex sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-20 h-20">
              <Menu className="size-10" />
              <span className="sr-only">Abrir / Fechar menu lateral</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between p-5 w-80 bg-[var(--black-secondary)] border-0 sm:hidden z-50 overflow-visible"
          >
            <div className="flex flex-col gap-10">
              <div>
                <Image src={Logo} alt="Logo do SCEO" className="w-50 p-5" />
              </div>
              <div>
                <nav>
                  <ul className="flex flex-col gap-10 w-full">
                    <Link
                      href={"/dashboard"}
                      className={linkStyle("/dashboard")}
                    >
                      <li>Dashboard</li>
                    </Link>
                    <Link
                      href={"/inventory"}
                      className={linkStyle("/inventory")}
                    >
                      <li>Inventário</li>
                    </Link>
                    <Link
                      href={"/transactions"}
                      className={linkStyle("/transactions")}
                    >
                      <li>Movimentações do Estoque</li>
                    </Link>
                  </ul>
                </nav>
              </div>
            </div>
            <div>
              <Loggeduser />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </aside>
  );
}
