import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { auth } from "@clerk/nextjs/server";

import "./globals.css";
import "../styles/clerk.css";

import { Montserrat } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="pt-BR" className={montserrat.className}>
        <body className="w-full h-screen flex flex-col lg:flex-row">
          {userId && <Sidebar />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
