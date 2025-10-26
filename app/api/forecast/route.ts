import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");
  if (!lat || !lon) return NextResponse.json({ error: "missing lat/lon" }, { status: 400 });

  const UA = process.env.NWS_USER_AGENT || "nate-portfolio (contact@example.com)";

  const pRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
    headers: { "User-Agent": UA, "Accept": "application/geo+json" },
    cache: "no-store",
  });
  const p = await pRes.json();
  const url = p.properties?.forecast;
  if (!url) return NextResponse.json({ error: "no forecast url" }, { status: 502 });

  const fRes = await fetch(url, {
    headers: { "User-Agent": UA, "Accept": "application/geo+json" },
    cache: "no-store",
  });
  const f = await fRes.json();
  return NextResponse.json(f);
}
