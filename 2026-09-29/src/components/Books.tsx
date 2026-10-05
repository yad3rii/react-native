import { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { Library, Book } from "../useLibrary";
import { s } from "../styles";
export default function Books({ lib }: {
    lib: Library;
}) {
    const [id, setId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const admin = lib.user?.role === "admin";
    async function save() {
        if (!title.trim() || !author.trim())
            return;
        const book: Book = { id: id ?? Date.now(), title, author };
        await lib.save(id === null
            ? [...lib.books, book]
            : lib.books.map((b) => (b.id === id ? book : b)));
        setId(null);
        setTitle("");
        setAuthor("");
    }
    return (<View style={{ flex: 1 }}>
      <FlatList data={lib.books} keyExtractor={(b) => String(b.id)} ListEmptyComponent={<Text>Книг немає</Text>} renderItem={({ item }) => (<View style={s.card}>
            <Text>
              {item.title} — {item.author}
            </Text>
            {admin ? (<View>
                <Button title="Редагувати" onPress={() => {
                    setId(item.id);
                    setTitle(item.title);
                    setAuthor(item.author);
                }}/>
                <Button title="Видалити" onPress={() => {
                    void lib.save(lib.books.filter((b) => b.id !== item.id));
                    if (id === item.id) {
                        setId(null);
                        setTitle("");
                        setAuthor("");
                    }
                }}/>
              </View>) : null}
          </View>)}/>
      {admin ? (<View>
          <TextInput style={s.input} placeholder="Назва книги" value={title} onChangeText={setTitle}/>
          <TextInput style={s.input} placeholder="Автор" value={author} onChangeText={setAuthor}/>
          <Button title={id === null ? "Додати книгу" : "Оновити книгу"} onPress={() => void save()}/>
        </View>) : (<Text>Тільки перегляд</Text>)}
    </View>);
}
