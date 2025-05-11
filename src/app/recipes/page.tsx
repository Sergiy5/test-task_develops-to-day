import {Recipes} from "@/components/Recipes";

export const revalidate = 60;  // Revalidate every 60 seconds

export default async function Page({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | undefined } 
  }) {
  const params = await searchParams;
  
  const query = params.query;
  const cuisine = params.cuisine;
  const maxReadyTime = params.maxReadyTime;
  
  const getRecipes = async () => {
    const res = await fetch(
      `http://localhost:3000/api/recipes?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}`
    );
    return res.json();
  };

  const recipes = await getRecipes();

  
  return (
    <div className="p-6">
        <Recipes recipes={recipes} />
    </div>
  );
}
