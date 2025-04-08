import Button from "@/components/button";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Divide } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-5 items-center">
        <SignIn afterSignInUrl="/dashboard"/>
        <Link href={"/login"}>
          <Button>Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
