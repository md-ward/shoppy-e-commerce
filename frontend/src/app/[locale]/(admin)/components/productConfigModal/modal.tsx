"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface VariantOption {
  id: number;
  value: string;
}

const Modal = ({
  onClose,
  contentType,
}: {
  onClose: () => void;
  contentType: "category" | "variant" | null| undefined;
}) => {
  return (
    <AnimatePresence mode="wait">
      {contentType && (
        <div className="flex h-full w-[70%] items-center justify-center p-4">
          {contentType === "category" ? (
            <CategoryModalContent onClose={onClose} />
          ) : (
            <VariantModalContent onClose={onClose} />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

// ------------------ Category Modal --------------------
export const CategoryModalContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="dark:bg-secondary-dark w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-accent dark:text-accent-dark mb-4 text-2xl font-bold">
        Add New Category
      </h2>
      <input
        type="text"
        placeholder="Category Name"
        className="dark:bg-background-dark mb-4 w-full rounded-md border p-2 dark:border-gray-700"
      />
      <div className="flex justify-end gap-2">
        <button
          className="text-foreground rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
        <button className="bg-primary hover:bg-primary-light rounded px-4 py-2 text-white">
          Save
        </button>
      </div>
    </motion.div>
  );
};

// ------------------ Variant Modal --------------------
export const VariantModalContent = ({ onClose }: { onClose: () => void }) => {
  const [variantName, setVariantName] = useState("");
  const [options, setOptions] = useState<VariantOption[]>([
    { id: 1, value: "" },
  ]);

  const handleOptionChange = (id: number, value: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, value } : opt)),
    );
  };

  const addOption = () => {
    setOptions((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const removeOption = (id: number) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="dark:bg-secondary-dark w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-accent dark:text-accent-dark mb-4 text-2xl font-bold">
        Add New Variant
      </h2>

      {/* Variant Name */}
      <input
        type="text"
        value={variantName}
        onChange={(e) => setVariantName(e.target.value)}
        placeholder="Variant Name (e.g., Size, Material)"
        className="dark:bg-background-dark mb-4 w-full rounded-md border p-2 dark:border-gray-700"
      />

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="text"
              value={option.value}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              placeholder="Option (e.g., Small, Large)"
              className="dark:bg-background-dark flex-1 rounded-md border p-2 dark:border-gray-700"
            />
            <button
              onClick={() => removeOption(option.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add Option Button */}
      <button
        onClick={addOption}
        className="bg-primary hover:bg-primary-light dark:bg-primary-light-dark mt-4 w-full rounded px-4 py-2 text-white"
      >
        + Add Option
      </button>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          className="text-foreground rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
        <button className="bg-primary hover:bg-primary-light rounded px-4 py-2 text-white">
          Save Variant
        </button>
      </div>
    </motion.div>
  );
};
