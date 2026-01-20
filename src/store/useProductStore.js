import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    categories: [],
    loading: false,
    error: null,

    setProducts: (products) => set({ products }),
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),
}));