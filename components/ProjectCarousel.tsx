"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectCarousel() {
  const [i, setI] = useState(0);
  const cur = projects[i];

  const next = () => setI((i+1) % projects.length);
  const prev = () => setI((i-1+projects.length) % projects.length);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={prev}>Prev</button>
          <button className="px-3 py-1 border rounded" onClick={next}>Next</button>
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
            <Link className="px-3 py-1 rounded bg-neutral-900 text-white" href={cur.href} target="_blank">Live Site</Link>
            <button
              onClick={() => window.open(cur.iframe, "_blank")}
              className="px-3 py-1 rounded border"
            >
              Open iframe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
