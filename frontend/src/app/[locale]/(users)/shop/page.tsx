"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/Products/productCard";
import { FilteringSidebar } from "./components/filteringSidebar";
import axios from "axios";

const PRODUCTS_PER_PAGE = 8;

const ShopPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/products?page=${page}`,
        );
        setProducts(res.data.products);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="relative flex min-h-screen gap-8 p-8">
      <FilteringSidebar />
      <div className="flex flex-col justify-between">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <nav
          className="mt-10 flex items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <button
            onClick={() => router.push(`/shop?page=${page - 1}`)}
            disabled={page <= 1}
            className="rounded-md border bg-white p-2 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => router.push(`/shop?page=${index + 1}`)}
              className={`rounded-md border px-4 py-2 ${
                page === index + 1 ? "bg-black text-white" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => router.push(`/shop?page=${page + 1}`)}
            disabled={page >= totalPages}
            className="rounded-md border bg-white p-2 disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ShopPage;
