export type ProductType = {
    id: string;
    title: string;
    price: number;
    emoji: string;
};
export type CategoryType = {
    id: string;
    name: string;
    image: string;
    color: string;
};
export const products: ProductType[] = [
    { id: "1", title: "Банани", price: 59, emoji: "🍌" },
    { id: "2", title: "Помідори", price: 89, emoji: "🍅" },
    { id: "3", title: "Яблука", price: 35, emoji: "🍎" },
    { id: "4", title: "Салат", price: 28, emoji: "🥬" },
];
export const categories: CategoryType[] = [
    { id: "1", name: "Фрукти та овочі", image: "🍏", color: "#d8efd8" },
    { id: "2", name: "Молочні продукти", image: "🥛", color: "#d8eafa" },
    { id: "3", name: "М’ясо та риба", image: "🥩", color: "#f8dddd" },
    { id: "4", name: "Хліб", image: "🥖", color: "#e9ddfa" },
    { id: "5", name: "Напої", image: "🥤", color: "#fff0c9" },
];
