import { create } from "zustand";
export const useShop = create<{
    liked: number[];
    cart: number[];
    like: (id: number) => void;
    add: (id: number) => void;
}>((set) => ({
    liked: [],
    cart: [],
    like: (id) => set((s) => ({
        liked: s.liked.includes(id)
            ? s.liked.filter((x) => x !== id)
            : [...s.liked, id],
    })),
    add: (id) => set((s) => ({ cart: [...s.cart, id] })),
}));
