import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email } });
        if (!user?.passwordHash) return null;

        const ok = await compare(creds.password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, name: user.name ?? "", email: user.email ?? "" };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
};
