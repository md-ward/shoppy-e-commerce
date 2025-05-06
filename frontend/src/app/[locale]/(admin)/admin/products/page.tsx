import Image from "next/image";

import imgUrlChecker from "@/lib/imgUrlChecker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import axios from "axios";
import { getLocale } from "next-intl/server";
import {
  LocaleBasedProduct,
  productLocaleFormatter,
} from "@/lib/productLocaleFormatter";
import { Product } from "@/lib/types";
import NotFoundPage from "../../not-found";
import { notFound } from "next/navigation";
const PRODUCTS_PER_PAGE = 10;
const AdminProductsPage = async (searchParams: {
  searchParams: Promise<URLSearchParams>;
}) => {
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
    <div className="flex w-full flex-col p-4">
      <span className="flex w-full flex-row justify-between">
        <h1 className="mb-4 text-2xl font-semibold">Products</h1>\
        <Link href={"/admin/products/add"}>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Add Product
          </button>
        </Link>
      </span>{" "}
      <div className="flex-1">
        {/* Pagination */}
        <nav
          className="*:dark:text-foreground mt-10 flex flex-wrap items-center justify-center gap-2"
          aria-label="Pagination"
        >
          {currentPage > 1 ? (
            <Link
              href={`/admin/products?page=${currentPage - 1}`}
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
              href={`/admin/products?page=${index + 1}`}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                currentPage === index + 1
                  ? "bg-gradient text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </Link>
          ))}

          {currentPage < totalPages ? (
            <Link
              href={`/admin/products?page=${currentPage + 1}`}
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

        {/* ADD THIS WRAPPER */}
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full min-w-[800px] table-auto">
            <thead className="border-dashed border-gray-300 bg-gray-100 text-left text-sm font-medium">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-3 text-center">{product.id}</td>
                    <td className="p-3">
                      <div className="flex h-16 w-16 overflow-x-scroll rounded">
                        {product.images.map((image, index) => (
                          <Image
                            key={index}
                            width={64}
                            height={64}
                            src={imgUrlChecker(image.url)}
                            alt={product.name}
                            className="object-cover"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{product.name}</td>
                    <td className="overflow-x-auto p-3">
                      {product.description}
                    </td>
                    <td className="p-3 font-semibold">${product.price}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;

// // ![Components]
// // ? Pagination
// const PaginationComponent = ({
//   page,
//   totalPages,
//   nextPage,
//   previousPage,
//   setPage,
// }: {
//   page: number;
//   totalPages: number;
//   nextPage: () => void;
//   previousPage: () => void;
//   setPage: (page: number) => void;
// }) => {
//   return (
//     <div className="flex justify-end gap-4 p-2">
//       <button
//         onClick={previousPage}
//         disabled={page === 1}
//         className="cursor-pointer rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//       >
//         <ArrowLeftIcon />
//       </button>
//       <span className="flex items-center gap-2">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setPage(index + 1);
//             }}
//             className={`cursor-pointer rounded px-2 py-1 ${
//               page === index + 1
//                 ? "hover:bg-accent bg-blue-500 text-white"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </span>
//       <button
//         onClick={nextPage}
//         disabled={page === totalPages}
//         className="cursor-pointer rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//       >
//         <ArrowRight />
//       </button>
//     </div>
//   );
// };
