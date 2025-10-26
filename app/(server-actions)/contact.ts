"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendContactEmail } from "@/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function submitContact(fd: FormData) {
  try {
    const data = ContactSchema.parse({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    });

    
    await Promise.all([
      prisma.contactInquiry.create({ data }),
      sendContactEmail(data),
    ]);

    revalidatePath("/");
    redirect("/?contact=ok");
  } catch (e) {
    console.error("submitContact error:", e);
    
    throw new Error("Failed to submit contact");
  }
}
