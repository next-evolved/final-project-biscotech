"use client";
import { useForecast } from "@/lib/useForecast";

export default function ForecastBadge() {
  const f = useForecast(true); // flip to false to use cache valley
  if (!f) return <span className="text-sm text-neutral-500">Forecast: …</span>;
  return (
    <span className="text-sm px-2 py-1 rounded border">
      {f.name}: {f.temperature}° · {f.shortForecast}
    </span>
  );
}
