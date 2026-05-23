import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Lista de Compras Inteligente",
  description: "Aplicação moderna para controlar compras pessoais com cálculos em tempo real.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
