import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching daily forecast data: ", error);
    return new Response("Error daily forecast data", { status: 500 });
  }
}
