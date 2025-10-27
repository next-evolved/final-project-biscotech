"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function submitContact(fd: FormData) {
  
  const parsed = ContactSchema.safeParse({
    name: fd.get("name"),
    email: fd.get("email"),
    message: fd.get("message"),
  });

  if (!parsed.success) {
    console.error("contact validation error:", parsed.error.flatten());
    redirect("/?contact=invalid"); 
  }

  const data = parsed.data;
  
  try {
    await prisma.contactInquiry.create({ data });
  } catch (e) {
    console.error("contact DB save failed:", e);    
  }
  
  try {
    const { EMAIL_SERVER_USER, EMAIL_SERVER_PASS, EMAIL_FROM, EMAIL_TO } = process.env;
    if (EMAIL_SERVER_USER && EMAIL_SERVER_PASS && EMAIL_FROM && EMAIL_TO) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: EMAIL_SERVER_USER, pass: EMAIL_SERVER_PASS },
      });

      await transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `New contact from ${data.name}`,
        text: `${data.name} <${data.email}> says:\n\n${data.message}`,
      });
    } else {
      console.warn("contact email skipped: missing EMAIL_* envs");
    }
  } catch (e) {
    console.error("contact email failed:", e);    
  }
  
  redirect("/?contact=ok");
}

