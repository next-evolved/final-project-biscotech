"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Only the fields you actually use in the component.
// (Optional fields keep TS happy even if some items lack data.)
type ProjectItem = {
  id: string;
  title?: string | null;
  name?: string | null;
  description?: string | null;

  // media/links actually used below
  image?: string | null;       // your code references `cur.image`
  imageUrl?: string | null;    // in case your data uses this key instead
  href?: string | null;        // "Live Site" link
  liveUrl?: string | null;     // if your data used this name instead
  iframe?: string | null;      // in-page preview URL

  // keep a small escape hatch without using `any`
  [key: string]: unknown;
};

export default function ClientCarousel({ projects }: { projects: ProjectItem[] }) {
  // Guard against empty datasets (prevents runtime errors on `projects[0]`)
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

  const [i, setI] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  // Current project + safe fallbacks
  const cur = projects[i] as ProjectItem;
  const title = (cur.title ?? cur.name ?? "Untitled").toString();
  const image = (cur.image ?? cur.imageUrl ?? "/placeholder.png").toString();
  const href = (cur.href ?? cur.liveUrl ?? "#").toString();
  const canShowIframe = Boolean(cur.iframe && cur.iframe !== href);

  const next = () => setI((v) => (v + 1) % projects.length);
  const prev = () => setI((v) => (v - 1 + projects.length) % projects.length);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded cursor-pointer" onClick={prev} aria-label="Previous project">
            Prev
          </button>
          <button className="px-3 py-1 border rounded cursor-pointer" onClick={next} aria-label="Next project">
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
            {/* Disable the link if we don't have a real URL */}
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

      {/* Simple modal */}
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
            {/* Some sites won’t allow iframing; user will see a blank area + console warning */}
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
