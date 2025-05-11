import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const API_KEY = process.env.SPOONACULAR_API_KEY;

    if (!id) {
      return NextResponse.json({ error: 'Missing recipe ID' }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch recipe information from API.' },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recipe info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
