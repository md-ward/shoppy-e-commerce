// components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import {  Heart } from "lucide-react";

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
  return (
    <div className="group hover:cursor-pointer overflow-hidden relative flex w-64 max-h-80 flex-col items-center justify-start rounded-2xl border border-accent bg-white p-3 shadow-md transition hover:shadow-lg hover:-translate-y-1 duration-200 ease-in-out">
      <span className=" z-30 size-fit rounded-md right-0 absolute top-0 bg-white p-0.5 m-0.5 hover:text-red-500 shadow-sm">
        <Heart></Heart>
      </span>
      <span className="h-0 group-hover:h-4  w-full ease-in-out duration-150"></span>
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-primary-light/10">
        <Image
          src={
            product.images.length > 0
              ? encodeURI(product.images[0])
              : "/placeholder-image.jpg"
          }
          alt={product.name}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 w-full flex flex-col justify-between gap-1 transition-all duration-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-primary dark:text-secondary line-clamp-2">
            {product.name}
          </h2>
          <span className="ml-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            ${product.price}
          </span>
        </div>

        <div className="overflow-hidden">
          <p className="mt-1 h-0 group-hover:h-[2lh] text-xs text-muted-foreground line-clamp-2 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300">
            {product.description}
          </p>
          <span className="mt-1 block text-[11px] text-accent">
            Category: {product.category.name}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 rounded-2xl border border-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProductCard;
