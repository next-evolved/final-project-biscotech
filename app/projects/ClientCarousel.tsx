// app/projects/ClientCarousel.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";

export default function ClientCarousel({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const cur = projects[i]!;
  const next = () => setI((v) => (v + 1) % projects.length);
  const prev = () => setI((v) => (v - 1 + projects.length) % projects.length);

  const canShowIframe = !!cur.iframe && cur.iframe !== cur.href;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded cursor-pointer" onClick={prev}>Prev</button>
          <button className="px-3 py-1 border rounded cursor-pointer" onClick={next}>Next</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="border rounded-lg overflow-hidden">
          <Image src={cur.image} alt={cur.title} width={900} height={600} className="w-full h-auto" priority />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{cur.title}</h3>
          <p className="text-neutral-700">{cur.description}</p>
          <div className="flex gap-3">
            <Link className="px-3 py-1 rounded bg-neutral-900 text-white cursor-pointer" href={cur.href} target="_blank" rel="noreferrer">
              Live Site
            </Link>

            {canShowIframe && (
              <button
                className="px-3 py-1 rounded border"
                onClick={() => setPreview(cur.iframe!)}
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
        <div className="fixed inset-0 bg-black/50 z-50 grid place-items-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-medium">Preview</span>
              <button className="px-2 py-1 border rounded" onClick={() => setPreview(null)}>Close</button>
            </div>
            {/* Some sites won’t allow iframing; user will see a blank area + console warning */}
            <iframe
              src={preview}
              className="w-full h-full"
              loading="eager"
              // sandbox can be adjusted if needed:
              // sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </div>
  );
}

