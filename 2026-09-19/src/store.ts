import { create } from "zustand";
type Product = {
    id: number;
    title: string;
    price: number;
};
export const useProducts = create<{
    products: Product[];
    addProduct: (p: Product) => void;
    removeProduct: (id: number) => void;
}>((set) => ({
    products: [],
    addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
    removeProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
}));
