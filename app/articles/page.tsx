import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Page() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Articles</h1>
      <ul className="grid gap-3">
        {articles.map(a => (
          <li key={a.id} className="border rounded p-4">
            <h2 className="font-semibold"><Link href={`/articles/${a.slug}`}>{a.title}</Link></h2>
            <p className="text-sm text-neutral-600">{a.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
