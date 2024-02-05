import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./ui/Sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyBaseNextJs",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex bg-black">
          <SideNav />
          {children}
        </main>
      </body>
    </html>
  );
}
