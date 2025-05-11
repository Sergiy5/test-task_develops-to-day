import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const API_KEY = process.env.SPOONACULAR_API_KEY;
  if (!id) {
    return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  const data = await res.json();

  return NextResponse.json(data);
}
