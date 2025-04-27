"use client";
import React, { useState } from "react";
import Modal from "../../../components/productConfigModal/modal";

const ProductConfig: React.FC = () => {
  const [contentType, setContentType] = useState<
    "category" | "variant" | null
  >();
  return (
    <div className="bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark  p-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-primary dark:text-primary-dark mb-2 text-4xl font-bold">
          Product Settings
        </h1>
        <p>
          Manage categories, variants, and colors to use when creating products.
        </p>
      </div>

      <section className="relative flex h-full gap-2">
        {/* Cards Grid */}
        <div className="flex w-[30%] flex-col gap-4 *:p-2">
          {/* Categories Card */}
          <div className="dark:bg-secondary-dark flex flex-col justify-between rounded-2xl bg-white shadow-md">
            <div>
              <h2 className="text-accent dark:text-accent-dark mb-4 text-2xl font-semibold">
                Categories
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Create and organize product categories like T-shirts, Mugs, or
                Accessories.
              </p>
            </div>
            <button
              onClick={() => setContentType("category")}
              className="bg-primary hover:bg-primary-light dark:bg-primary-light-dark rounded-lg px-4 py-2 font-bold text-white transition"
            >
              Manage Categories
            </button>
          </div>

          {/* Variants Card */}
          <div className="dark:bg-secondary-dark flex flex-col justify-between rounded-2xl bg-white shadow-md">
            <div>
              <h2 className="text-accent dark:text-accent-dark mb-4 text-2xl font-semibold">
                Variants
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Define variant types like Size, Material, or Style with their
                available options.
              </p>
            </div>
            <button
              onClick={() => setContentType("variant")}
              className="bg-primary hover:bg-primary-light dark:bg-primary-light-dark rounded-lg px-4 py-2 font-bold text-white transition"
            >
              Manage Variants
            </button>
          </div>
        </div>
        {/* Modal Component */}
        <Modal contentType={contentType} onClose={() => setContentType(null)} />
      </section>
    </div>
  );
};

export default ProductConfig;
