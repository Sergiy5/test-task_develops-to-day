import Image from "next/image";
import Link from "next/link";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

interface RecepiesProps {
  recipes: Recipe[];
}

export const Recipes: React.FC<RecepiesProps> = ({ recipes }) => {
  
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map(({ id, title, image }) => (
        <Link key={id} href={`/recipes/${id}`} className="">
          <div className="border rounded shadow-sm hover:shadow-md min-h-[290px] h-full">
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
