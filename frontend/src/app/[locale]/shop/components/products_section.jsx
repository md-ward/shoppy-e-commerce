import ProductCard from "./product_card";
import { useEffect } from "react";
import useDashboardFeaturesStore from "../../admin/store/useDashboardFeaturesStore";
import useShopStore from "../store/useShopStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const ProductSection = () => {
  const { products, handleGettingProducts } = useDashboardFeaturesStore(
    (state) => ({
      products: state.products,
      handleGettingProducts: state.handleGettingProducts,
    }),
  );
  const { filteredProducts } = useShopStore((state) => ({
    filteredProducts: state.filteredProducts,
  }));

  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  function handleChangePage(page) {
    window.scrollTo({ top });
    handleGettingProducts(page);
    setSearchParams({ page: page });
  }

  useEffect(() => {
    handleGettingProducts(searchParams.get("page"));
  }, [handleGettingProducts, searchParams]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-8 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {filteredProducts.length > 0
          ? filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          : products.products?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
      </div>

      <nav
        className="isolate flex h-fit   w-full   items-center  justify-center gap-2 -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          onClick={() => handleChangePage(Number(searchParams.get("page")) - 1)}
          disabled={Number(searchParams.get("page")) <= 1}
          className=" relative  inline-flex cursor-pointer items-center rounded-l-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-100"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faChevronLeft} />
        </button>

        {Array.from({ length: products.pages }, (_, index) => (
          <span
            onClick={() => handleChangePage(index + 1)}
            className={` relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              products.currentPage == index + 1 ? "custom_grad text-white " : ""
            }`}
            key={index}
          >
            {index + 1}
          </span>
        ))}

        <button
          onClick={() => handleChangePage(Number(searchParams.get("page")) + 1)}
          disabled={Number(searchParams.get("page")) >= products.pages}
          className="relative inline-flex cursor-pointer items-center rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-100"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faChevronRight} />
        </button>
      </nav>
    </>
  );
};

export default ProductSection;
