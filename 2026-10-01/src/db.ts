import * as SQLite from "expo-sqlite";
export type Book = {
    id: number;
    title: string;
    author: string;
};
export const db = SQLite.openDatabaseAsync("books.db").then(async (db) => {
    await db.execAsync("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT NOT NULL)");
    return db;
});
