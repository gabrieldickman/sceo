import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateAccountPage() {
  const userId = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-5 items-center">
        <SignUp />
        <Link href={"/login"}>
          <Button className="w-50 sm:w-150 h-20 text-2xl cursor-pointer hover:bg-[var(--gray-dark)]">Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
