import Image from "next/image";
import Logo from "../../public/logo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <Image src={Logo} alt="SCEO Logo" className="w-150 sm:w-200" />
      <Link href="/login">
        <Button className="w-50 sm:w-150 h-20 text-2xl cursor-pointer hover:bg-[var(--gray-dark)]">Acessar</Button>
      </Link>
    </div>
  );
}
