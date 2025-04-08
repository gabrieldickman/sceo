import Image from "next/image";
import Logo from "../../public/logo.svg";
import Button from "@/components/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <Image src={Logo} alt="SCEO Logo" />
      <Link href="/login">
        <Button>Acessar</Button>
      </Link>
    </div>
  );
}
