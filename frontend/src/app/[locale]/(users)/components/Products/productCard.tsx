// components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import imgUrlChecker from "@/lib/imgUrlChecker";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();
  function onClick() {
    router.push(`/shop/${product.id}`);
  }
  return (
    <div
      onClick={onClick}
      className="group border-accent relative z-0 flex max-h-80 w-64 flex-col items-center justify-start overflow-hidden rounded-2xl border bg-white p-3 shadow-md transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg"
    >
      <span className="absolute top-0 right-0 z-30 m-0.5 size-fit rounded-md bg-white p-0.5 shadow-sm hover:text-red-500">
        <Heart></Heart>
      </span>
      <span className="h-0 w-full duration-150 ease-in-out group-hover:h-4"></span>
      <div className="bg-primary-light/10 relative h-52 w-full overflow-hidden rounded-xl">
        <Image
          src={
            product.images.length > 0
              ? imgUrlChecker(product.images[0])
              : "/placeholder-image.jpg"
          }
          alt={product.name}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex w-full flex-col justify-between gap-1 transition-all duration-200">
        <div className="flex items-center justify-between">
          <h2 className="text-primary dark:text-secondary line-clamp-2 text-sm font-semibold">
            {product.name}
          </h2>
          <span className="ml-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            ${product.price}
          </span>
        </div>

        <div className="overflow-hidden">
          <p className="text-muted-foreground mt-1 line-clamp-2 h-0 scale-y-0 text-xs opacity-0 transition-all duration-300 group-hover:h-[2lh] group-hover:scale-y-100 group-hover:opacity-100">
            {product.description}
          </p>
          <span className="text-accent mt-1 block text-[11px]">
            Category: {product.category.name}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 rounded-2xl border border-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
    </div>
  );
};

export default ProductCard;
