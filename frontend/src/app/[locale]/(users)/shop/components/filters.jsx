import { useState, useEffect } from "react";
import useDashboardFeaturesStore from "../../admin/store/useDashboardFeaturesStore";
import useShopStore from "../store/useShopStore";

const FilterSection = () => {
  const { categories, handleGettingCategories } = useDashboardFeaturesStore(
    (state) => ({
      handleGettingCategories: state.handleGettingCategories,
      categories: state.categories,
    }),
  );
  const {
    handleSelectCategory,
    selectedCategories,
    handleGettingFilteredProducts,
  } = useShopStore((state) => ({
    handleSelectCategory: state.handleSelectCategory,
    selectedCategories: state.selectedCategories,
    handleGettingFilteredProducts: state.handleGettingFilteredProducts,
  }));

  const [toggleFilters, setToggleFilters] = useState(false);

  useEffect(() => {
    handleGettingCategories();
  }, [handleGettingCategories]);

  return (
    <div className="relative">
      <div
        title="filters"
        className="cursor-pointer"
        onClick={() => setToggleFilters(!toggleFilters)}
      >
        <img
          src="/assets/filter.svg"
          alt="apply filters icon"
          className="h-5 transition-all duration-300 ease-in-out hover:scale-110"
        />
      </div>
      {toggleFilters && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGettingFilteredProducts();
            setToggleFilters(!toggleFilters);
          }}
          className="absolute z-30 mt-2 min-w-52 rounded bg-white shadow-lg"
        >
          <div className="border-b px-4 py-2">
            <h2 className="text-lg font-semibold">Filter by Category</h2>
          </div>
          <ul className="custom-scrollbar  space-y-2 divide-y overflow-y-auto py-2">
            {categories?.map((category, index) => (
              <li
                onClick={() => handleSelectCategory(category.category)}
                key={index}
                className={`flex  cursor-pointer items-center justify-between  px-4 py-2 hover:bg-gray-100 ${
                  selectedCategories?.includes(category.category)
                    ? "bg-indigo-200 hover:bg-indigo-200"
                    : "text-gray-900"
                }`}
              >
                <span>{category.category}</span>
                {selectedCategories?.includes(category.category) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 5.293a1 1 0 00-1.414-1.414L8 9.586 5.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t px-4 py-2">
            <h2 className="text-lg font-semibold">Filter by Price Range</h2>
            <ul className="py-2">
              <li className="px-4 py-2">Under $50</li>
              <li className="px-4 py-2">$50 - $100</li>
              <li className="px-4 py-2">$100 - $200</li>
              {/* Add more price range options as needed */}
            </ul>
          </div>

          <button className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            Apply
          </button>
        </form>
      )}
    </div>
  );
};

export default FilterSection;
