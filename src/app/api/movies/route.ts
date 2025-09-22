import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}?api_key=${env.API_KEY}&query=${query}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
