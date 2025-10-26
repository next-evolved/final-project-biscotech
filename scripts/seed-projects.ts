import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    title: "OpenRange",
    slug: "openrange",
    description: "Ten-page website build. Desktop + mobile.",
    href: "https://youropenrange.com/",
    image: "/openrange-thumb.png",
    iframe: "https://youropenrange.com/"
  },
  {
    title: "Parasol",
    slug: "parasol",
    description: "One-page informational scroll for AKG.",
    href: "https://parasolhealth.com/",
    image: "/parasol-thumb.png",
    iframe: "https://parasolhealth.com/"
  },
  {
    title: "ATI Advisory",
    slug: "ati-advisory",
    description: "Six-page build with responsive considerations.",
    href: "https://atiadvisory.com/",
    image: "/ati-thumb.png",
    iframe: "https://atiadvisory.com/"
  },
  {
    title: "Lastmile Logistix",
    slug: "lastmile-logistix",
    description: "Five-page build with creative elements.",
    href: "https://www.lastmilelogistix.com/",
    image: "/lastmile-thumb.png",
    iframe: "https://www.lastmilelogistix.com/"
  },
] as const;

async function main() {
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log("Upserted projects!");
}

main().finally(() => prisma.$disconnect());
