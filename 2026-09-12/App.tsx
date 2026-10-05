import { useState } from "react";
import { Text, Button, FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { products } from "./src/data";
import { s } from "./src/styles";
export default function App() {
    const [mode, setMode] = useState("asc");
    const items = [...products].sort((a, b) => mode === "name"
        ? a.title.localeCompare(b.title, "uk")
        : mode === "asc"
            ? a.price - b.price
            : b.price - a.price);
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        <Button title="Ціна ↑" onPress={() => setMode("asc")}/>
        <Button title="Ціна ↓" onPress={() => setMode("desc")}/>
        <Button title="Назва А–Я" onPress={() => setMode("name")}/>
        <FlatList data={items} keyExtractor={(p) => p.id} renderItem={({ item }) => (<View style={s.card}>
              <Text>
                {item.emoji} {item.title} — {item.price} грн
              </Text>
            </View>)}/>
      </SafeAreaView>
    </SafeAreaProvider>);
}
