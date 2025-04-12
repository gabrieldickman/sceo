import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userId = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row mt-10 ml-10">
      <h1 className="text-5xl font-bold font-white">Dashboard</h1>
    </div>
  );
}
