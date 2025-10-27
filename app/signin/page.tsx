"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-sm mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <input className="border rounded p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border rounded p-2 w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full px-3 py-2 rounded bg-neutral-900 text-white"
        onClick={() => signIn("credentials", { email, password, callbackUrl: "/" })}>
        Sign in
      </button>

      <div className="text-sm text-center">
        <span className="text-neutral-600">New here? </span>
        <Link href="/signup" className="underline">Create account</Link>
      </div>
    </div>
  );
}
