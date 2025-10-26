// app/hooks/useForecast.ts
"use client";
import { useEffect, useState } from "react";

type Period = { name: string; temperature: number; shortForecast: string };

const DEFAULT_COORDS = { lat: 41.737, lon: -111.834 }; // Cache Valley, UT

export function useForecast(askForGeo = false) {
  const [period, setPeriod] = useState<Period | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function fetchForecast(lat: number, lon: number) {
      try {
        const fRes = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`, {
          cache: "no-store",
          signal: ctrl.signal,
        });
        if (!fRes.ok) throw new Error("forecast fetch failed");
        const f = await fRes.json();

        const first = f?.properties?.periods?.[0];
        setPeriod(
          first
            ? {
                name: first.name,
                temperature: first.temperature,
                shortForecast: first.shortForecast,
              }
            : null
        );
      } catch {
        if (!ctrl.signal.aborted) setPeriod(null);
      }
    }

    if (askForGeo && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchForecast(pos.coords.latitude, pos.coords.longitude),
        () => fetchForecast(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon),
        { enableHighAccuracy: false, timeout: 6000 }
      );
    } else {
      fetchForecast(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
    }

    return () => ctrl.abort();
  }, [askForGeo]);

  return period;
}

