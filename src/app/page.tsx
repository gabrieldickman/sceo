import Image from "next/image";
import Logo from "../../public/logo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if(userId){
    redirect("/dashboard");
  }
  
  return( 
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
    <Image src={Logo} alt="SCEO Logo" className="w-150 sm:w-200" />
    <Link href="/login">
      <Button className="w-50 sm:w-150 h-20 text-2xl cursor-pointer hover:bg-[var(--gray-dark)]">Acessar</Button>
    </Link>
  </div>
  );
}
