"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Only the fields you actually use in the component.
type ProjectItem = {
  id: string;
  title?: string | null;
  name?: string | null;
  description?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  href?: string | null;
  liveUrl?: string | null;
  iframe?: string | null;
  [key: string]: unknown;
};

export default function ClientCarousel({ projects }: { projects: ProjectItem[] }) {
  // ✅ Hooks must be first, unconditionally
  const [i, setI] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  // Handle empty list after hooks are declared
  if (!projects || projects.length === 0) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <div className="text-neutral-600">No projects to display.</div>
      </div>
    );
  }

  // Keep index in range in case projects length changes
  const idx = ((i % projects.length) + projects.length) % projects.length;
  const cur = projects[idx] as ProjectItem;

  const title = (cur.title ?? cur.name ?? "Untitled").toString();
  const image = (cur.image ?? cur.imageUrl ?? "/placeholder.png").toString();
  const href = (cur.href ?? cur.liveUrl ?? "#").toString();
  const canShowIframe = Boolean(cur.iframe && cur.iframe !== href);

  const next = () => setI((v) => (v + 1) % projects.length);
  const prev = () => setI((v) => (v - 1 + projects.length) % projects.length);

  const navDisabled = projects.length <= 1;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prev}
            aria-label="Previous project"
            disabled={navDisabled}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={next}
            aria-label="Next project"
            disabled={navDisabled}
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="border rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={900}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          {cur.description && <p className="text-neutral-700">{cur.description}</p>}

          <div className="flex gap-3">
            {href !== "#" ? (
              <Link
                className="px-3 py-1 rounded bg-neutral-900 text-white cursor-pointer"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                Live Site
              </Link>
            ) : (
              <button className="px-3 py-1 rounded bg-neutral-300 text-neutral-600 cursor-not-allowed">
                Live Site
              </button>
            )}

            {canShowIframe && (
              <button
                className="px-3 py-1 rounded border"
                onClick={() => setPreview(cur.iframe as string)}
                title="Preview inside this page"
              >
                Preview
              </button>
            )}
          </div>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 bg-black/50 z-50 grid place-items-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-5xl h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-medium">Preview</span>
              <button className="px-2 py-1 border rounded" onClick={() => setPreview(null)}>
                Close
              </button>
            </div>
            <iframe
              src={preview}
              className="w-full h-full"
              loading="eager"
              // sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </div>
  );
}
