import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { createComment, updateComment, deleteComment } from "@/app/(server-actions)/comments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

<<<<<<< HEAD
export const dynamic = "force-dynamic";
export const revalidate = 0;


type CommentItem = {
  id: string;
  body: string;
  createdAt: Date | string;
  user: { email: string | null } | null;
};

type ArticleWithComments = {
  id: string;
  slug: string;
  title: string;
  body: string;
  comments: CommentItem[];
};

type Params = { slug: string };

export default async function Page(props: unknown) {
  const { params } = props as { params: Params };
  const { slug } = params;

  const article = (await prisma.article.findUnique({
    where: { slug },
=======
export default async function Page({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
>>>>>>> parent of 7d4f01d (params fix)
    include: { comments: { orderBy: { createdAt: "desc" }, include: { user: true } } },
  })) as ArticleWithComments | null;

  if (!article) return notFound();

  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{article.title}</h1>
        <p className="whitespace-pre-wrap mt-2">{article.body}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Comments</h2>

        {session ? (
          <form action={createComment} className="grid gap-2">
            <input type="hidden" name="articleId" value={article.id} />
            <input type="hidden" name="slug" value={article.slug} />
            <textarea name="body" className="border rounded p-2" rows={3} placeholder="Add a comment…" required />
            <button className="self-start px-3 py-1 rounded bg-neutral-900 text-white">Post</button>
          </form>
        ) : (
          <p className="text-sm text-neutral-600">Login to comment.</p>
        )}

        <ul className="grid gap-3">
<<<<<<< HEAD
          {article.comments.map((c: CommentItem) => (
=======
          {article.comments.map(c => (
>>>>>>> parent of 7d4f01d (params fix)
            <li key={c.id} className="border rounded p-3">
              <p className="text-sm text-neutral-600 mb-1">{c.user?.email ?? "User"} · {new Date(c.createdAt).toLocaleString()}</p>
              <p className="whitespace-pre-wrap">{c.body}</p>

              {session?.user?.email && session.user.email === c.user?.email && (
                <div className="flex gap-2 mt-2">
                  <form action={updateComment} className="flex gap-2 w-full">
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="slug" value={article.slug} />
                    <input name="body" defaultValue={c.body} className="border rounded p-1 flex-1" />
                    <button className="px-2 border rounded">Save</button>
                  </form>
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="slug" value={article.slug} />
                    <button className="px-2 border rounded">Delete</button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

