import { useState } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { products } from "./src/data";
import { s } from "./src/styles";
export default function App() {
    const [liked, setLiked] = useState(products.map((p) => p.id));
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        <Text style={s.title}>Обране ❤️</Text>
        <Text>У вас {liked.length} улюблених товарів</Text>
        <FlatList numColumns={2} data={products.filter((p) => liked.includes(p.id))} keyExtractor={(p) => p.id} renderItem={({ item }) => (<View style={[s.card, { flex: 1 }]}>
              <Pressable onPress={() => setLiked(liked.filter((id) => id !== item.id))}>
                <Text>♥</Text>
              </Pressable>
              <Text style={{ fontSize: 55 }}>{item.emoji}</Text>
              <Text>{item.title}</Text>
              <Text>{item.price} грн/кг</Text>
              <Text>⭐ 4.8</Text>
            </View>)}/>
      </SafeAreaView>
    </SafeAreaProvider>);
}
