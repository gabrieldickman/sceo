import Image from "next/image";
import Logo from "../../../public/logo.svg";
import LoginImage from "../../../public/login-image.svg";
import GoogleIcon from "../../../public/google-icon.svg";
import Button from "@/components/button";
import { Mail } from "lucide-react";

export default function Login() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-screen h-screen">
      {/* Esquerda */}
      <div className="flex flex-col items-center gap-90 mt-30">
        <Image src={Logo} alt="SCEO Logo" className="w-100 sm:w-200" />
        <div className="flex flex-col items-center gap-10 xl:items-start">
          <h1 className="font-bold text-6xl">Entrar</h1>
          <Button>
            <Image src={GoogleIcon} alt="Icone do Google" />
            Entrar com Google
          </Button>
          <Button>
            <Mail />
            Entrar com E-mail
          </Button>
        </div>
      </div>

      {/* Direita (Imagem some em telas menores) */}
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
