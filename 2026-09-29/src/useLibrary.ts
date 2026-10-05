import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type Book = {
    id: number;
    title: string;
    author: string;
};
type User = {
    name: string;
    password: string;
    role: "admin" | "reader";
};
const admin: User = { name: "admin", password: "123", role: "admin" };
export function useLibrary() {
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<User[]>([admin]);
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        async function load() {
            try {
                const data = await AsyncStorage.multiGet(["books", "users", "session"]);
                const saved: User[] = JSON.parse(data[1][1] || "[]");
                const all = [admin, ...saved.filter((u) => u.name !== "admin")];
                setBooks(JSON.parse(data[0][1] || "[]"));
                setUsers(all);
                setUser(all.find((u) => u.name === data[2][1]) || null);
                setReady(true);
            }
            catch {
                setError("Помилка сховища");
            }
        }
        void load();
    }, []);
    async function login(name: string, password: string) {
        const found = users.find((u) => u.name === name && u.password === password);
        if (!found)
            return false;
        await AsyncStorage.setItem("session", name);
        setUser(found);
        return true;
    }
    async function logout() {
        await AsyncStorage.removeItem("session");
        setUser(null);
    }
    async function save(next: Book[]) {
        if (user?.role !== "admin")
            return;
        await AsyncStorage.setItem("books", JSON.stringify(next));
        setBooks(next);
    }
    async function register(name: string, password: string) {
        if (user?.role !== "admin" ||
            !name ||
            !password ||
            users.some((u) => u.name === name))
            return false;
        const next: User[] = [...users, { name, password, role: "reader" }];
        await AsyncStorage.setItem("users", JSON.stringify(next.filter((u) => u.role !== "admin")));
        setUsers(next);
        return true;
    }
    return { books, user, ready, error, login, logout, save, register };
}
export type Library = ReturnType<typeof useLibrary>;
