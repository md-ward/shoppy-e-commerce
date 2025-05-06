import { Attachment, Product } from "./types";
export interface LocaleBasedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: Attachment[];
}

export function productLocaleFormatter(product: Product, locale: "en" | "ar") {
  if (locale == "en") {
    return {
      id: product.id,
      name: product.en_name,
      description: product.en_description,
      price: product.price,
      category: product.category.en_category,
      images: product.images,
    } as LocaleBasedProduct;
  } else {
    return {
      id: product.id,
      name: product.ar_name,
      description: product.ar_description,
      price: product.price,
      category: product.category.ar_category,
      images: product.images,
    } as LocaleBasedProduct;
  }
}

export const directionBasedOnLocale =  (locale:"en"|"ar") => {
  if (locale == "en") {
    return "ltr";
  } else {
    return "rtl";
  }
};
