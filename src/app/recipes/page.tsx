import { Suspense } from "react";
import {Recipes} from "@/components/Recipes";
// import Loading from "./loading"; // fallback

export default function RecipesPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<div className="text-center text-blue-400 text-2xl ">Loading...</div>}>
        <Recipes />
      </Suspense>
    </div>
  );
}
