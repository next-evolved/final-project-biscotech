import "server-only";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASS,
  },
});

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"${name}" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: `New contact from ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
  });
}
