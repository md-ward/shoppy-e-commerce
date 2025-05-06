import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/app/[locale]/(users)/shop/components/Products/productCard";
import { Product } from "@/lib/types";
import axios from "axios";
import { Link } from "@/i18n/navigation";
import NotFoundPage from "../not-found";
import { getLocale } from "next-intl/server";
import {
  LocaleBasedProduct,
  productLocaleFormatter,
} from "@/lib/productLocaleFormatter";

const PRODUCTS_PER_PAGE = 10;

async function ShopPage(
  searchParams: {
  searchParams: Promise<URLSearchParams>;
}
) {
  //@ts-expect-error page may not be defined
  const currentPage = +(await searchParams.searchParams).page || 1;
  console.log({ currentPage });

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${PRODUCTS_PER_PAGE}&page=${currentPage}`,
  );

  const locale = (await getLocale()) as "en" | "ar";
  const products: LocaleBasedProduct[] = data.products.map((product: Product) =>
    productLocaleFormatter(product, locale),
  );
  const totalPages: number = data.totalPages;

  if (currentPage > totalPages && totalPages !== 0) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex w-full grow flex-col items-center py-4">
      {/* <FilteringSidebar /> */}
      <div className="grid !h-full w-full grow gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard locale={locale} key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <nav
        className="*:dark:text-foreground mt-10 flex flex-wrap items-center justify-center gap-2"
        aria-label="Pagination"
      >
        {currentPage > 1 ? (
          <Link
            href={`/shop?page=${currentPage - 1}`}
            className="rounded-md border bg-white px-3 py-1.5"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <div className="rounded-md border bg-gray-100 px-3 py-1.5 opacity-50">
            <ChevronLeft className="h-5 w-5" />
          </div>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            href={`/shop?page=${index + 1}`}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              currentPage === index + 1 ? "bg-gradient text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </Link>
        ))}

        {currentPage < totalPages ? (
          <Link
            href={`/shop?page=${currentPage + 1}`}
            className="rounded-md border bg-white px-3 py-1.5"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <div className="rounded-md border bg-gray-100 px-3 py-1.5 opacity-50">
            <ChevronRight className="h-5 w-5" />
          </div>
        )}
      </nav>
    </div>
  );
}

export default ShopPage;
