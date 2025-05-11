"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "./Loader";

interface Props {
  id: number;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
  cuisines: string[];
  dishTypes: string[];
  extendedIngredients: { name: string; original: string }[];
  aggregateLikes: number;
  healthScore: number;
}

export const DetailRecipe=({ id }: Props) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/detailRecipe?id=${id}`);
          const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) return <Loader />;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={556}
        height={370}
        className="rounded-lg mb-4"
      />
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
      <p>
        <strong>Ready in:</strong> {recipe.readyInMinutes} min
      </p>
      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <p>
        <strong>Likes:</strong> {recipe.aggregateLikes}
      </p>
      <p>
        <strong>Health Score:</strong> {recipe.healthScore}
      </p>
      <p>
        <strong>Cuisines:</strong> {recipe.cuisines.join(", ")}
      </p>
      <p>
        <strong>Dish Types:</strong> {recipe.dishTypes.join(", ")}
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">Ingredients</h2>
      <ul className="list-disc pl-5">
        {recipe.extendedIngredients.map((ing, idx) => (
          <li key={idx}>{ing.original}</li>
        ))}
      </ul>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">Instructions</h2>
      <div
        className="text-gray-800"
        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
      />
    </div>
  );
}
