"use client";

import { AnimatePresence } from "motion/react";
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
    <aside className="bg-secondary text-foreground dark:text-foreground-dark dark:bg-secondary-dark flex h-fit w-full flex-row items-center justify-between space-x-4 rounded-lg border border-zinc-200 p-4 shadow-md dark:border-zinc-700">
      <AnimatePresence mode="wait">
    
        {/* Category Dropdown */}
        <div className="flex w-1/4 items-center justify-around gap-2">
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="focus:ring-primary w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Dropdown */}
        <div className="flex w-1/3 items-center justify-around gap-2">
          <label className="mb-1 block text-sm font-medium text-nowrap">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder="Min"
              className="focus:ring-accent w-1/2 rounded-md border border-zinc-300 bg-white p-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
            />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">to</span>
            <input
              type="number"
              placeholder="Max"
              className="focus:ring-accent w-1/2 rounded-md border border-zinc-300 bg-white p-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
            />
          </div>
        </div>

        {/* Product Types Dropdown */}
        <div className="flex w-1/4 items-center justify-around gap-2">
          <label
            htmlFor="product-type"
            className="mb-1 block text-sm font-medium text-nowrap"
          >
            Product Type
          </label>
          <select
            id="product-type"
            className="focus:ring-primary w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          >
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Button */}
        <button
          className="bg-primary hover:bg-primary-light w-1/6 cursor-pointer rounded-md py-2 text-sm font-medium text-white"
          type="button"
        >
          Apply
        </button>
        <button
          className="w-1/12 cursor-pointer rounded-md bg-rose-500 py-2 text-sm font-medium text-white hover:bg-rose-600"
          type="button"
        >
          Reset
        </button>
      </AnimatePresence>
    </aside>
  );
}
