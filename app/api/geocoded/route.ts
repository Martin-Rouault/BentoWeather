import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPENWEATHERMAP_API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching geocoded data: ", error);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
