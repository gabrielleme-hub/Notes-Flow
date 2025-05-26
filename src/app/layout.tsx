"use client";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { AuthProvider } from "@/context/auth";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={robotoSlab.variable}>
      <body className={`${robotoSlab.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">{children}</div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
