"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

export const Recipes=()=> {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const cuisine = searchParams.get("cuisine") || "";
  const maxReadyTime = searchParams.get("maxReadyTime") || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ query, cuisine, maxReadyTime });
        const res = await fetch(`/api/recipes?${params.toString()}`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query, cuisine, maxReadyTime]);

  if (loading) return <p>Loading recipes...</p>;
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map(({ id, title, image }) => (
        <Link key={id} href={`/recipes/${id}`}>
          <div className="border rounded shadow-sm hover:shadow-md">
            <Image
              src={image}
              alt={title}
              width={400}
              height={300}
              className="w-full object-cover rounded-t"
            />
            <div className="p-4">
              <h2 className="font-semibold">{title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
