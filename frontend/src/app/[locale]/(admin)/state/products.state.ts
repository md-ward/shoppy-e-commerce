import {
  LocaleBasedProduct,
  productLocaleFormatter,
} from "@/lib/productLocaleFormatter";
import { Product } from "@/lib/types";
import axios from "axios";
import { getLocale } from "next-intl/server";
import { create } from "zustand";

interface ProductsStore {
  loading: boolean;
  totalPages: number;
  page: number;
  products: LocaleBasedProduct[];
  product: Product | null;
  nextPage: () => void;
  previousPage: () => void;
  setPage: (page: number) => void;
  fetchProducts: (limit?: number, page?: number) => Promise<void>;
  // addProduct: (product: Product) => void;
  // updateProduct: (productId: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
  resetProducts: () => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  page: 1,
  totalPages: 0,
  products: [],
  loading: false,
  product: null,
  resetProducts: () =>
    set(() => ({
      products: [],
      totalPages: 1,
      loading: false,
    })),
  nextPage: () => {
    set((state) => ({ page: state.page + 1 }));
  },
  previousPage: () => {
    set((state) => ({ page: Math.max(state.page - 1, 1) }));
  },
  setPage: (page: number) => {
    set({ page });
  },

  fetchProducts: async (limit = 5, page) => {
    try {
      const locale = (await getLocale()) as "en" | "ar";
      set({ loading: true });

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&&page=${page ? page : get().page}`,
      );
      set({
        totalPages: data.totalPages,
        products: data.products.map((product: Product) =>
          productLocaleFormatter(product, locale),
        ),
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
}));
