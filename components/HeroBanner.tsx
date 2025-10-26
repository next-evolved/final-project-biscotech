"use client";
import Image from "next/image";

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute w-10 h-10 border-2 border-[#205295] ${className}`}
      aria-hidden
    />
  );
}

export default function HeroBanner() {
  return (
    <section className="container mx-auto mt-10 mb-12 grid items-center gap-10 md:grid-cols-2">
      <div className="flex justify-center">
        <div className="relative aspect-[4/3] w-full max-w-md rounded-xl border-2 border-neutral-900 bg-white">          
          <Image
            src="/nd.png"
            alt="Nate at the keys"
            fill
            className="object-contain p-4"
            priority
          />
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-center md:text-left text-4xl sm:text-5xl font-bold tracking-wide text-[#205295]">
          NATE DAINES
        </h1>

        {/* Framed block (FULL STACK + blurb + WebDev) */}
        <div className="relative rounded-lg bg-blue-50/70 p-6 pt-8 pb-8">
          {/* corners */}
          <Corner className="-top-2 -left-2 rounded-tl-lg border-b-0 border-r-0" />
          <Corner className="-top-2 -right-2 rounded-tr-lg border-b-0 border-l-0" />
          <Corner className="-bottom-2 -left-2 rounded-bl-lg border-t-0 border-r-0" />
          <Corner className="-bottom-2 -right-2 rounded-br-lg border-t-0 border-l-0" />

          <p className="text-center text-3xl sm:text-4xl font-semibold text-[#205295]">
            FULL STACK
          </p>

          <p className="mx-auto mt-4 max-w-prose text-center text-blue-900/80">
            An enthusiastic developer with a collaborative spirit and a keen eye for detail.
            Versatile, reliable under pressure, and always learning. I love building clean,
            responsive interfaces and solid backends that make real things work.
          </p>

          <p className="mt-6 text-center text-3xl sm:text-4xl font-semibold text-[#205295]">
            WebDev
          </p>
        </div>
      </div>
    </section>
  );
}
