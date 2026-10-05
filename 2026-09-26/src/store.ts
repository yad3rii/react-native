import { create } from "zustand";
type Category = {
    slug: string;
    name: string;
    image: string;
};
export const useShop = create<{
    liked: number[];
    cart: number[];
    categories: Category[];
    error: string;
    like: (id: number) => void;
    add: (id: number) => void;
    load: () => Promise<void>;
}>((set) => ({
    liked: [],
    cart: [],
    categories: [],
    error: "",
    like: (id) => set((s) => ({
        liked: s.liked.includes(id)
            ? s.liked.filter((x) => x !== id)
            : [...s.liked, id],
    })),
    add: (id) => set((s) => ({ cart: [...s.cart, id] })),
    load: async () => {
        try {
            const [a, b] = await Promise.all([
                fetch("https://dummyjson.com/products/categories"),
                fetch("https://dummyjson.com/products?limit=0"),
            ]);
            if (!a.ok || !b.ok)
                throw Error();
            const cats: {
                slug: string;
                name: string;
            }[] = await a.json();
            const data: {
                products: {
                    category: string;
                    thumbnail: string;
                }[];
            } = await b.json();
            set({
                categories: cats.map((c) => ({
                    ...c,
                    image: data.products.find((p) => p.category === c.slug)?.thumbnail || "",
                })),
                error: "",
            });
        }
        catch {
            set({ error: "Не вдалося завантажити категорії" });
        }
    },
}));
