import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching weather data: ", error);
    return new Response("Error fetching weather data", { status: 500 });
  }
}
