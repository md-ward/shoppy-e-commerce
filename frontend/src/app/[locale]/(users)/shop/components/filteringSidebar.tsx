"use client";

import { useEffect, useState } from "react";

export function FilteringSidebar() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const productTypes = ["Mugs", "Stickers", "Notebooks"];

  // Simulated API call
  useEffect(() => {
    // Replace with actual API call
    setTimeout(() => {
      setCategories(["All", "Electronics", "Clothing", "Books", "Accessories"]);
    }, 500);
  }, []);

  return (
    <aside className="bg-secondary text-foreground dark:text-foreground-dark dark:bg-secondary-dark sticky top-2 h-fit w-full max-w-xs space-y-6 rounded-lg border border-zinc-200 p-4 shadow-md dark:border-zinc-700">
      <h2 className="text-foreground dark:text-foreground-dark text-lg font-semibold">
        Filters
      </h2>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="focus:ring-primary w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 "
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-1 block text-sm font-medium">Price Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            className="focus:ring-accent w-1/2 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 "
          />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">to</span>
          <input
            type="number"
            placeholder="Max"
            className="focus:ring-accent w-1/2 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 "
          />
        </div>
      </div>

      {/* Product Types */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Product Type
        </h3>
        <ul className="space-y-2">
          {productTypes.map((type) => {
            const id = `type-${type.toLowerCase()}`;
            return (
              <li key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={id}
                  name={type}
                  className="text-primary focus:ring-primary h-4 w-4 rounded border-zinc-300 bg-white focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800"
                />
                <label
                  htmlFor={id}
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  {type}
                </label>
              </li>
            );
          })}
        </ul>
        <button
          className="bg-primary hover:bg-primary-light mt-4 w-full cursor-pointer rounded-md py-2 text-sm font-medium text-white"
          type="button"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
