import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import imgUrlChecker from "@/lib/imgUrlChecker";
import { Product } from "@/lib/types";
import { Link } from "@/i18n/navigation";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group relative z-0 m-1 flex h-fit w-full max-w-64 flex-col items-center justify-start overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-md dark:border-gray-600 dark:bg-gray-700">
      <span
        title="add to Cart "
        className="hover:text-accent-dark absolute top-0 right-0 z-30 m-1 size-fit rounded-md bg-white p-1 text-gray-600 shadow-sm transition dark:bg-gray-800 dark:text-gray-300"
      >
        <ShoppingCart className="h-4 w-4" />
      </span>
      <span
        title="add to favorite "
        className="absolute top-0 left-0 z-30 m-1 size-fit rounded-md bg-white p-1 text-gray-600 shadow-sm transition hover:text-red-500 dark:bg-gray-800 dark:text-gray-300"
      >
        <Heart className="h-4 w-4" />
      </span>
      <Link className="w-full" href={`/shop/product/${product.id}`}>
        <div className="relative mt-4 h-52 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          {product.images.map((image, idx) => (
            <Image
              key={idx}
              className="h-full w-full object-contain"
              src={imgUrlChecker(image.url)}
              alt={product.en_name || "Product image"}
              fill
            />
          ))}
        </div>

        <div className="mt-3 flex w-full flex-col justify-between gap-1">
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-2 text-sm font-semibold text-nowrap text-gray-800 dark:text-gray-100">
              {product.en_name}
            </h2>
            <span className="ml-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-md">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex w-full flex-col justify-start overflow-hidden">
        <p className="mt-1 line-clamp-2 text-xs text-nowrap text-gray-500 dark:text-gray-400">
          {product.en_description}
        </p>
        <span className="mt-1 block text-[11px] text-nowrap text-gray-400 dark:text-gray-500">
          Category: {product.category.name}
        </span>

        <Link
          className="bg-accent-dark mt-2 block rounded-full p-1 text-center text-sm text-white"
          href={`/shop/product/buy/${product.id}`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
