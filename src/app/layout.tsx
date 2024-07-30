import type { Metadata } from "next";
import "./globals.css";
import { quicksand } from "@/font";
import { Provider } from "@/components";



export const metadata: Metadata = {
  title: "Mirian | Shop ",
  description: "tienda virtual de miriam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
