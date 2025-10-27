"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const RegisterSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export async function registerUser(fd: FormData) {
  const parsed = RegisterSchema.safeParse({
    name: fd.get("name"),
    email: fd.get("email"),
    password: fd.get("password"),
  });
  if (!parsed.success) throw new Error("Invalid form");

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const passwordHash = await hash(password, 10);
  await prisma.user.create({ data: { name, email, passwordHash } });

  revalidatePath("/signin");
  redirect("/signin?created=1");
}
