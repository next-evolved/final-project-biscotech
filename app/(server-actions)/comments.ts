"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const CommentSchema = z.object({
  articleId: z.string().cuid(),
  body: z.string().min(1).max(2000),
});

async function userId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Unauthorized");
  return user.id;
}

export async function createComment(fd: FormData) {
  try {
    const data = CommentSchema.parse({
      articleId: fd.get("articleId"),
      body: fd.get("body"),
    });
    const uid = await userId();
    const c = await prisma.comment.create({ data: { ...data, userId: uid } });
    revalidatePath(`/articles/${fd.get("slug")}`);
    return c;
  } catch (_e) {
    throw new Error("Failed to create comment");
  }
}

export async function updateComment(fd: FormData) {
  try {
    const id = String(fd.get("id"));
    const body = String(fd.get("body") || "");
    const uid = await userId();

    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing || existing.userId !== uid) throw new Error("Forbidden");

    await prisma.comment.update({ where: { id }, data: { body } });
    revalidatePath(`/articles/${fd.get("slug")}`);
  } catch (_e) {
    throw new Error("Failed to update comment");
  }
}

export async function deleteComment(fd: FormData) {
  try {
    const id = String(fd.get("id"));
    const uid = await userId();

    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing || existing.userId !== uid) throw new Error("Forbidden");

    await prisma.comment.delete({ where: { id } });
    revalidatePath(`/articles/${fd.get("slug")}`);
  } catch {
    throw new Error("Failed to delete comment");
  }
}
