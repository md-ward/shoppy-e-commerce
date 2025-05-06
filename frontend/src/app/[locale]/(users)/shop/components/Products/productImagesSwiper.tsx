"use client";
import imgUrlChecker from "@/lib/imgUrlChecker";
import { Attachment } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const ProductImagesSwiper = ({
  images,
  productLink,
}: {
  images: Attachment[];
  productLink: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div dir="ltr" className="relative mt-4 flex h-60 w-full items-center overflow-hidden rounded-xl  p-2 dark:bg-gray-800">
      {/* Arrow Left */}
      <div
        onClick={prevImage}
        className="z-[100] mr-2 flex aspect-square size-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
      >
        <ArrowLeft className="h-5 w-5" />
      </div>

      {/* Image Swiper */}
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={images[currentIndex].id}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 h-full w-full"
          >
            <Link href={productLink}>
              <Image
                src={imgUrlChecker(images[currentIndex].url)}
                alt="product image"
                fill
                className="object-contain"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        onClick={nextImage}
        className="z-[100] ml-2 flex aspect-square size-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
      >
        <ArrowRight className="h-5 w-5" />
      </div>
    </div>
  );
};

export default ProductImagesSwiper;
