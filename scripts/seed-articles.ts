import { prisma } from "@/lib/db";
async function main() {
  await prisma.article.createMany({
    data: [
      { title: "How I built OpenRange", slug: "openrange-build", excerpt: "Notes on process", body: "Lorem ipsum..." },
      { title: "Responsive details for Parasol", slug: "parasol-responsive", excerpt: "Breakpoints & polish", body: "Lorem ipsum..." },
    ],
    skipDuplicates: true
  });
  console.log("Seeded articles");
}
main().then(()=>process.exit(0));
