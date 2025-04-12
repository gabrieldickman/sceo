import Image from "next/image";
import Logo from "../../../public/logo.svg";
import LoginImage from "../../../public/login-image.svg";
import GoogleIcon from "../../../public/google-icon.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-screen h-screen">
      <div className="flex flex-col items-center gap-90 mt-30">
        <Image src={Logo} alt="SCEO Logo" className="w-100 sm:w-200" />
        <div className="flex flex-col gap-10 items-center xl:items-start">
          <h1 className="font-bold text4-5xl">Faça login ou cadastre-se</h1>
          <Link href={"/sign-in"}>
            <Button className="bg-[var(--black-secondary)] rounded-md hover:bg-[var(--gray-dark)] cursor-pointer text-2xl sm:w-150 h-20 p-5 flex flex-row items-center justify-center gap-5">
              <Image src={GoogleIcon} alt="Icone do Google" />
            </Button>
          </Link>
          <Link href={"/create-account"}>
            <Button className="bg-[var(--black-secondary)] rounded-md hover:bg-[var(--gray-dark)] cursor-pointer text-2xl sm:w-150 h-20 p-5 flex flex-row items-center justify-center gap-5">
              Criar conta
            </Button>
          </Link>
        </div>
      </div>

      <div className="items-center h-full justify-end hidden xl:flex">
        <Image
          src={LoginImage}
          alt="Imagem de 4 caixas marrons em nichos e uma planta na frente"
          className="rounded-[var(--image-radius)]"
          height={900}
        />
      </div>
    </div>
  );
}
