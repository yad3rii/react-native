import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { db, Book } from "./db";
import { s } from "./styles";
export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [query, setQuery] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [id, setId] = useState<number | null>(null);
    const [revision, setRevision] = useState(0);
    const [error, setError] = useState("");
    useEffect(() => {
        let active = true;
        async function load() {
            try {
                const database = await db;
                const rows = await database.getAllAsync<Book>("SELECT * FROM books WHERE title LIKE ? OR author LIKE ?", ["%" + query + "%", "%" + query + "%"]);
                if (active)
                    setBooks(rows);
            }
            catch {
                setError("Помилка бази даних");
            }
        }
        void load();
        return () => {
            active = false;
        };
    }, [query, revision]);
    async function save() {
        if (!title.trim() || !author.trim())
            return;
        try {
            const database = await db;
            if (id === null)
                await database.runAsync("INSERT INTO books (title,author) VALUES (?,?)", [title, author]);
            else
                await database.runAsync("UPDATE books SET title=?,author=? WHERE id=?", [title, author, id]);
            setTitle("");
            setAuthor("");
            setId(null);
            setRevision((v) => v + 1);
        }
        catch {
            setError("Не вдалося зберегти");
        }
    }
    async function remove(bookId?: number) {
        try {
            const database = await db;
            if (bookId === undefined)
                await database.runAsync("DELETE FROM books");
            else
                await database.runAsync("DELETE FROM books WHERE id=?", [bookId]);
            if (bookId === undefined || id === bookId) {
                setId(null);
                setTitle("");
                setAuthor("");
            }
            setRevision((v) => v + 1);
        }
        catch {
            setError("Не вдалося видалити");
        }
    }
    return (<View style={{ flex: 1 }}>
      <TextInput style={s.input} placeholder="Пошук" value={query} onChangeText={setQuery}/>
      <Text>{error}</Text>
      <FlatList data={books} keyExtractor={(b) => String(b.id)} ListEmptyComponent={<Text>Книг немає</Text>} renderItem={({ item }) => (<View style={s.card}>
            <Text>
              {item.title} — {item.author}
            </Text>
            <Button title="Редагувати" onPress={() => {
                setId(item.id);
                setTitle(item.title);
                setAuthor(item.author);
            }}/>
            <Button title="Видалити" onPress={() => void remove(item.id)}/>
          </View>)}/>
      <TextInput style={s.input} placeholder="Назва книги" value={title} onChangeText={setTitle}/>
      <TextInput style={s.input} placeholder="Автор" value={author} onChangeText={setAuthor}/>
      <Button title={id === null ? "Додати" : "Оновити"} onPress={() => void save()}/>
      <Button title="Видалити всі" onPress={() => void remove()}/>
    </View>);
}
