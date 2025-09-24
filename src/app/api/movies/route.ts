// import { NextResponse } from "next/server";
// import { env } from "@/env";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("query");

//   if (!query) {
//     return NextResponse.json({ error: "Missing query" }, { status: 400 });
//   }

//   const res = await fetch(
//     `${env.NEXT_PUBLIC_API_URL}?api_key=${env.API_KEY}&query=${query}`
//   );

//   const data = await res.json();
//   return NextResponse.json(data);
// }

import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";
  const timeWindow = searchParams.get("time_window") || "day";

  let url = "";

  if (query) {
    url = `${env.NEXT_PUBLIC_API_URL}?api_key=${
      env.API_KEY
    }&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false&language=en-US`;
  } else {
    url = `${env.NEXT_PUBLIC_TRENDING_API_URL}/${timeWindow}?api_key=${env.API_KEY}&page=${page}&language=en-US`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
