import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = 48.75909;
    const lon = 2.16966;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
    
    const res = await axios.get(url);
    
    return NextResponse.json(res.data)

  } catch (error) {
    console.log("Error fetching weather data: ", error);
    return new Response("Error fetching weather data", { status: 500 });
  }
}
