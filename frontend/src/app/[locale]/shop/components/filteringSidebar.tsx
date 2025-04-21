"use client";

import { useState } from "react";

export function FilteringSidebar() {
  const [priceRange, setPriceRange] = useState({ min: 10, max: 200 });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productTypes = ["Mugs", "Stickers", "Notebooks"];
  const categories = ["All", "Electronics", "Clothing", "Books"];

  return (
    <aside className="sticky top-0 w-full max-w-xs space-y-10 border-r border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
        Filters
      </h2>

      {/* Category Dropdown */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="focus:ring-primary w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Slider */}
      <div className="relative">
        <label className="mb-4 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Price
        </label>
        <div className="flex w-full items-center justify-center gap-2">
          <input
            type="number"
            min={10}
            className="hover:bg-background focus:outline-accent w-24 rounded-md border border-gray-300 bg-white px-2 py-1 shadow"
          />
          <h3>To</h3>
          <input
            type="number"
            className="hover:bg-background focus:outline-accent w-24 rounded-md border border-gray-300 bg-white px-2 py-1 shadow"
          />
        </div>
      </div>

      {/* Product Types */}
      <div>
        <h3 className="text-md mb-3 font-semibold text-zinc-700 dark:text-zinc-200">
          Product Type
        </h3>
        <ul className="space-y-3">
          {productTypes.map((type) => {
            const id = `type-${type.toLowerCase()}`;
            return (
              <li key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={id}
                  name={type}
                  className="text-primary focus:ring-primary h-4 w-4 rounded border-zinc-300 bg-white focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800"
                />
                <label
                  htmlFor={id}
                  className="ml-3 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  {type}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
