import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-5 items-center">
        <SignUp />
        <Link href={"/"}>
          <Button className="w-50 sm:w-150 h-20 text-2xl cursor-pointer hover:bg-[var(--gray-dark)]">
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
}
