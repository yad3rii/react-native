import { useState } from "react";
import { Text, TextInput, Button, FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { categories } from "./src/data";
import { s } from "./src/styles";
export default function App() {
    const [items, setItems] = useState(categories);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");
    function add() {
        if (!name.trim())
            return;
        setItems([
            ...items,
            {
                id: Date.now().toString(),
                name,
                image: image || "🍏",
                color: /^#[0-9a-f]{6}$/i.test(color) ? color : "#eee",
            },
        ]);
        setName("");
        setImage("");
        setColor("");
    }
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        <Text style={s.title}>Категорії</Text>
        <TextInput style={s.input} placeholder="Назва" value={name} onChangeText={setName}/>
        <TextInput style={s.input} placeholder="Emoji" value={image} onChangeText={setImage}/>
        <TextInput style={s.input} placeholder="Колір #aabbcc" value={color} onChangeText={setColor}/>
        <Button title="Додати" onPress={add}/>
        <FlatList data={items} keyExtractor={(c) => c.id} renderItem={({ item }) => (<View style={[s.card, { backgroundColor: item.color }]}>
              <Text>
                {item.image} {item.name}
              </Text>
            </View>)}/>
      </SafeAreaView>
    </SafeAreaProvider>);
}
