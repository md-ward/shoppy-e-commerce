"use client";
import Image from "next/image";
import { useProductsStore } from "../../state/products.state";
import { useEffect } from "react";
import imgUrlChecker from "@/lib/imgUrlChecker";
import Loading from "./loading";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";

const AdminProductsPage = () => {
  const {
    products,
    fetchProducts,
    page,
    totalPages,
    nextPage,
    previousPage,
    loading,
    setPage,
  } = useProductsStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page]);
  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex-1">
        <PaginationComponent
          nextPage={nextPage}
          previousPage={previousPage}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

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

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-500">
                    <Loading />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-3 text-center">{product.id}</td>
                      <td className="p-3">
                        <div className="flex h-16 w-16 overflow-hidden rounded">
                          {product.images.map((image, index) => (
                            <Image
                              key={index}
                              width={64}
                              height={64}
                              src={imgUrlChecker(image)}
                              alt={product.name}
                              className="object-cover"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">{product.description}</td>
                      <td className="p-3 font-semibold">${product.price}</td>
                      <td className="p-3">{product.category.name}</td>
                      <td className="p-3">
                        <button
                          onClick={() =>
                            console.log("Edit product", product.id)
                          }
                          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>
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
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;

// ![Components]
// ? Pagination
const PaginationComponent = ({
  page,
  totalPages,
  nextPage,
  previousPage,
  setPage,
}: {
  page: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
}) => {
  return (
    <div className="flex justify-end gap-4 p-2">
      <button
        onClick={previousPage}
        disabled={page === 1}
        className="cursor-pointer rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        <ArrowLeftIcon />
      </button>
      <span className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setPage(index + 1);
            }}
            className={`cursor-pointer rounded px-2 py-1 ${
              page === index + 1
                ? "hover:bg-accent bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </span>
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="cursor-pointer rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
