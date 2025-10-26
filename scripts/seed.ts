import { prisma } from "@/lib/db";
import { hash } from "bcrypt";

const email = process.env.SEED_USER_EMAIL!;
const password = process.env.SEED_USER_PASSWORD!;

async function main() {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Seed user exists");
    return;
  }
  const passwordHash = await hash(password, 10);
  await prisma.user.create({
    data: { email, name: "Demo User", passwordHash },
  });
  console.log("Seeded:", email, password);
}
main().then(() => process.exit(0));
