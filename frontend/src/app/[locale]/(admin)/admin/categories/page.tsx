import { Category } from "@/lib/types";
import axios from "axios";

const CategoryPage = async () => {
  const categories = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/detailed`,
  );

  return (
    <div className="flex h-full w-full flex-col">
      <h1>Categories</h1>
      <ul className="grid size-full grid-cols-4 grid-rows-12">
        {categories.data.categories.map((category: Category) => (
          <span
            className="m-1 flex flex-col place-content-center items-center rounded-md bg-slate-300 uppercase *:last:text-sm"
            key={category.id}
          >
            <li>{category.en_category}</li>

            <li>{category.ar_category}</li>
          </span>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
