"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/Products/productCard";
import { FilteringSidebar } from "./components/filteringSidebar";

const fakeProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `This is a description for product ${i + 1}`,
  images: [
    `https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
  ],
  category: `Category ${Math.floor(Math.random() * 5) + 1}`,
  price: (Math.random() * 100).toFixed(2),
}));

const productsPerPage = 8;

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [filteredProducts, setFilteredProducts] = useState(fakeProducts);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  function handleChangePage(page: number) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/products?page=${page}`);
  }

  return (
    <div className="flex min-h-screen p-8">
      <FilteringSidebar />
      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <nav
          className="mt-10 flex items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-md border bg-white p-2 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleChangePage(index + 1)}
              className={`rounded-md border px-4 py-2 ${
                currentPage === index + 1 ? "bg-black text-white" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-md border bg-white p-2 disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductsPage;
