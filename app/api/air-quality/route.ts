import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
    
    const res = await axios.get(url);
    
    return NextResponse.json(res.data)

  } catch (error) {
    console.log("Error fetching air quality data: ", error);
    return new Response("Error air quality data", { status: 500 });
  }
}
