import { Product } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";

interface ProductsStore {
  loading: boolean;
  totalPages: number;
  page: number;
  products: Product[];
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (productId: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  page: 1,
  totalPages: 0,
  products: [],
  loading: false,
  nextPage: () => {
    set((state) => ({ page: state.page + 1 }));
  },
  previousPage: () => {
    set((state) => ({ page: Math.max(state.page - 1, 1) }));
  },
  setPage: (page: number) => {
    set({ page });
  },

  fetchProducts: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?limit=5&&page=${get().page}`,
      );
      set({
        totalPages: data.totalPages,
        products: data.products,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },
  updateProduct: (productId, updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product,
      ),
    }));
  },
  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
}));
