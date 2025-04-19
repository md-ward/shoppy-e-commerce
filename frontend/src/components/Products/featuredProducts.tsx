// components/FeaturedProducts.tsx
import React from "react";
import axios from "axios";
import ProductCard from "./productCard";

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

const FeaturedProducts: React.FC = async () => {
  const { data } = await axios.get("http://localhost:8000/products?page=3");

  return (
    <section className="w-full p-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
