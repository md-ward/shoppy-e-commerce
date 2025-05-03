export interface Product {
  id: number;
  ar_name?: string;
  ar_description?: string;
  en_name?: string;
  en_description?: string;
  price: number;
  category: { id: number; name: string };
  images: [Attachment];
}
interface Attachment {
  id: number;
  url: string;
}

interface Category {
  id: number;
  name: string;
}
interface Variant {
  id: number;
  name: string;
  value: string; 
}
