import { DetailRecipe } from "@/components/DetailRecipe";

export default async function Page(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const { id } = params;
  return (
    <div className="p-6">
      <DetailRecipe id={id} />
    </div>
  );
}
