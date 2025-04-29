import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/app/[locale]/(users)/components/Products/productCard";
import { Product } from "@/lib/types";
import axios from "axios";
import { Link } from "@/i18n/navigation";
import NotFoundPage from "../not-found";

const PRODUCTS_PER_PAGE = 10;

async function ShopPage(searchParams: {
  searchParams: Promise<URLSearchParams>;
}) {
  //@ts-expect-error page may not be defined
  const currentPage = +(await searchParams.searchParams).page || 1;
  console.log({ currentPage });

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${PRODUCTS_PER_PAGE}&page=${currentPage}`,
  );

  const products: Product[] = data.products;
  const totalPages: number = data.totalPages;

  if (currentPage > totalPages && totalPages !== 0) {
    return <NotFoundPage />;
  }

  return (
    <div className="container flex w-full flex-col items-center py-4">
      <div className="dark:!bg-background-dark grid !h-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 dark:text-white">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <nav
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
        aria-label="Pagination"
      >
        {currentPage > 1 ? (
          <Link
            href={`/shop?page=${currentPage - 1}`}
            className="rounded-md border bg-white p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <div className="rounded-md border bg-gray-100 p-2 opacity-50">
            <ChevronLeft className="h-5 w-5" />
          </div>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            href={`/shop?page=${index + 1}`}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              currentPage === index + 1 ? "bg-black text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </Link>
        ))}

        {currentPage < totalPages ? (
          <Link
            href={`/shop?page=${currentPage + 1}`}
            className="rounded-md border bg-white p-2"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <div className="rounded-md border bg-gray-100 p-2 opacity-50">
            <ChevronRight className="h-5 w-5" />
          </div>
        )}
      </nav>
    </div>
  );
}

export default ShopPage;
