"use server";

import { prisma } from "@/lib/db";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Strict helper that guarantees a user id or throws
async function requireUserId() {
  const session = (await getServerSession(authOptions)) as Session | null;
  const email = session?.user?.email;
  if (!email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Unauthorized");

  return user.id;
}

export async function createComment(fd: FormData) {
  const userId = await requireUserId();

  const articleId = String(fd.get("articleId") ?? "");
  const body = String(fd.get("body") ?? "").trim();
  const slug = String(fd.get("slug") ?? "");

  if (!articleId || !body) throw new Error("Missing fields");

  await prisma.comment.create({
    data: { body, articleId, userId },
  });

  revalidatePath(`/articles/${slug}`);
}

export async function updateComment(fd: FormData) {
  const userId = await requireUserId();

  const id = String(fd.get("id") ?? "");
  const body = String(fd.get("body") ?? "").trim();
  const slug = String(fd.get("slug") ?? "");

  if (!id || !body) throw new Error("Missing fields");

  // Enforce ownership
  const existing = await prisma.comment.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error("Forbidden");

  await prisma.comment.update({
    where: { id },
    data: { body },
  });

  revalidatePath(`/articles/${slug}`);
}

export async function deleteComment(fd: FormData) {
  const userId = await requireUserId();

  const id = String(fd.get("id") ?? "");
  const slug = String(fd.get("slug") ?? "");

  if (!id) throw new Error("Missing id");

  // Enforce ownership
  const existing = await prisma.comment.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error("Forbidden");

  await prisma.comment.delete({ where: { id } });

  revalidatePath(`/articles/${slug}`);
}
