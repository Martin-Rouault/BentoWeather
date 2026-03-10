import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        const city = searchParams.get("search");
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${process.env.OPENWEATHERMAP_API_KEY}`;

        const res = await fetch(url, {
            next: { revalidate: 900 },
        });

        const data = await res.json();

        const uniqueData = data.filter((item: any, index: number, self: any[]) =>
            index === self.findIndex((t) => (
                t.name === item.name && 
                t.country === item.country && 
                t.state === item.state
            ))
        ).slice(0, 5)

        return NextResponse.json(uniqueData);
    } catch (error) {
        console.log("Error fetching geocoded data: ", error);
        return new Response("Error fetching geocoded data", { status: 500 });
    }
}
