import { Inter } from "next/font/google";
import { UserInfo } from "../components/UserInfo";

import "./globals.css";
import Link from "next/link";
import { Providers } from "@/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Didit",
  description: "A social app like Reddit or Hacker News",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="border-b border-zinc-200 p-4 flex items-center shadow-lg sticky top-0 bg-foreground bg-opacity-65 backdrop-blur-xs text-background">
            <Link href="/" className="text-xl">
              Didit
            </Link>
            <Link
              href="/add-post"
              className="ml-[5%] hover:bg-zinc-300 p-2 rounded-sm bg-button-bg text-button hover:text-black"
            >
              Add post
            </Link>
            <div className="ml-auto">
              <UserInfo />
            </div>
          </header>
          <main className="max-w-(--breakpoint-xl) lg:mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
