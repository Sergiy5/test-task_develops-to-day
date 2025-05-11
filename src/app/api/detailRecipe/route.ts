// app/api/recipe/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const API_KEY = process.env.SPOONACULAR_API_KEY;
  console.log("ID===========================>",id)
  if (!id) {
    return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  const data = await res.json();

console.log("Respose route",data)
  return NextResponse.json(data);
}
