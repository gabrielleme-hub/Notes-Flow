import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rocket Notes",
  description: "Rocket Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${robotoSlab.variable}`}>
      <body
        className={`${robotoSlab.variable} ${robotoSlab.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col ">{children}</div>
      </body>
    </html>
  );
}
