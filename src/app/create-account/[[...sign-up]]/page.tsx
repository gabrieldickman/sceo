import Button from "@/components/button";
import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateAccountPage() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-5 items-center">
        <SignUp />
        <Link href={"/login"}>
          <Button>Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
