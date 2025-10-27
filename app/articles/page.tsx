import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;


type ArticleListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
};

export default async function ArticlesPage() {
  const articles = (await prisma.article.findMany({
    select: { id: true, slug: true, title: true, excerpt: true },
    orderBy: { createdAt: "desc" },
  })) as ArticleListItem[];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Articles</h1>

      <ul className="grid gap-3">
        {articles.map((a: ArticleListItem) => (
          <li key={a.id} className="border rounded p-4">
            <h2 className="font-semibold">
              <Link href={`/articles/${a.slug}`}>{a.title}</Link>
            </h2>
            {a.excerpt && (
              <p className="text-sm text-neutral-600">{a.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
