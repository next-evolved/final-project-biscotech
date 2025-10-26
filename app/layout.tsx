import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nate Portfolio",
  description: "Next15 + NextAuth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh bg-neutral-50 text-neutral-900`}>
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
