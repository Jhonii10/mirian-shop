import type { Metadata } from "next";
import "./globals.css";
import { quicksand } from "@/font";
import { Providers } from "@/components";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
  title: "Mirian | Shop ",
  description: "tienda virtual de miriam",
  manifest:"/manifest.json",
  icons:{
    apple:"/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={quicksand.className}>
      <Toaster
      position="bottom-right"
      reverseOrder={false}
      />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
