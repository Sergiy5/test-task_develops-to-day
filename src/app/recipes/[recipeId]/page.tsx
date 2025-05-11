import {DetailRecipe} from "@/components/DetailRecipe";

// interface PageProps {
//   params: { id: string };
// }

export default async function RecipePage(props: { params: Promise<{ recipeId: number }> }) {
  const params = await props.params;
  console.log("Params===============================>", params);
  const { recipeId } = params;
  return (
    <div className="p-6">
      <DetailRecipe id={recipeId} />
    </div>
  );
}
