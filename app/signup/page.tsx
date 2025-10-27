"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    startTransition(async () => {
      // 1) create account
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErr(data?.error ?? "Failed to create account");
        return;
      }

      // 2) auto sign-in with credentials
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/", // go home after login
      });
    });
  }

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="name"
          placeholder="Your name"
          className="border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          className="border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 chars)"
          className="border rounded p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full px-3 py-2 rounded bg-neutral-900 text-white disabled:opacity-60"
        >
          {pending ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-neutral-600">
        Already have an account? <Link className="underline" href="/signin">Sign in</Link>
      </p>
    </div>
  );
}
