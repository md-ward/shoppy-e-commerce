export interface Product {
  id: number;
  ar_name?: string;
  ar_description?: string;
  en_name?: string;
  en_description?: string;
  price: number;
  category: Category;
  images: Attachment[];
}
export interface Attachment {
  id: number|string;
  url: string;
}

export interface Category {
  id: number;
  en_category: string;
  ar_category?: string;
}
export interface Variant {
  id: number;
  name: string;
  value: string;
}
