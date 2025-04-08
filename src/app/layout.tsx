import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { dark } from "@clerk/themes";

import "./globals.css";
import "../styles/clerk.css"

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      localization={ptBR}
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="pt-BR" className={montserrat.className}>
        <body className="flex flex-row">{children}</body>
      </html>
    </ClerkProvider>
  );
}
