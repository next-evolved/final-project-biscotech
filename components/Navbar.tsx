"use client";
import Link from "next/link";
import ForecastBadge from "./ForecastBadge";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
      <div className="container mx-auto flex items-center justify-between p-3">
        <nav className="flex items-center gap-4">
          <Link href="/" className="font-semibold">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/articles">Articles</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ForecastBadge />
          {status === "authenticated" ? (
            <>
              <span className="text-sm">Hi, {session.user?.name ?? "you"}!</span>
              <button className="px-3 py-1 rounded bg-neutral-900 text-white cursor-pointer" onClick={() => signOut()}>
                Logout
              </button>
            </>
          ) : (
            <button className="px-3 py-1 rounded border" onClick={() => signIn()}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
