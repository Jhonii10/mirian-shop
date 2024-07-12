import type { Metadata } from "next";
import "./globals.css";
import { quicksand } from "@/font";


export const metadata: Metadata = {
  title: "Mirian | shop ",
  description: "tienda virtual de miriam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
