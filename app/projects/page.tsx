import { prisma } from "@/lib/db";
import ClientCarousel from "./ClientCarousel";

export default async function Page() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "asc" } });
  return <ClientCarousel projects={projects} />;
}

