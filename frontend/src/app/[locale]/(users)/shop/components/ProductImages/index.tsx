"use client";

import { useState } from "react";
import Image from "next/image";

const ProductImages = ({
  images,
  mainImage: initialImage,
}: {
  mainImage: string;
  images: string[];
}) => {
  const [mainImage, setMainImage] = useState(initialImage);

  return (
    <div className="flex max-w-3xl flex-col items-center justify-start gap-2">
      {/* Main Image */}
      <div className="border-accent dark:border-accent-dark relative h-[320px] w-[320px] overflow-hidden rounded-xl border shadow-md">
        <Image
          src={mainImage}
          fill
          alt="Main product image"
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex w-full flex-wrap justify-center gap-4 rounded-md bg-gradient-to-l from-gray-100 to-gray-200 p-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(img)}
            className={`relative h-[80px] w-[80px] rounded-md border-2 transition-all duration-200 focus:outline-none ${
              img === mainImage
                ? "border-primary dark:border-primary-dark ring-primary ring-2"
                : "hover:border-accent dark:hover:border-accent-dark border-transparent opacity-80"
            }`}
          >
            <Image
              src={img}
              fill
              alt={`Thumbnail ${i + 1}`}
              className="rounded-md object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
