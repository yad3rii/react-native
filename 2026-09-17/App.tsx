import { useState, useEffect } from "react";
import { View, Text, Button, Dimensions, Platform, ScrollView, } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./src/styles";
export default function App() {
    const [size, setSize] = useState(Dimensions.get("window"));
    const [items, setItems] = useState([
        { id: 1, name: "🍌 Банани", price: 59, qty: 1 },
        { id: 2, name: "🍅 Помідори", price: 89, qty: 1 },
    ]);
    useEffect(() => {
        const sub = Dimensions.addEventListener("change", ({ window }) => setSize(window));
        return () => sub.remove();
    }, []);
    const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);
    const wide = size.width > size.height;
    return (<SafeAreaProvider>
      <SafeAreaView style={[
            s.screen,
            { backgroundColor: Platform.OS === "ios" ? "#e6efff" : "#e5f5e5" },
        ]}>
        <Text style={s.title}>Кошик</Text>
        <View style={{ flex: 1, flexDirection: wide ? "row" : "column", gap: 16 }}>
          <ScrollView style={{ flex: 1 }}>
            {items.map((p) => (<View key={p.id} style={s.card}>
                <Text>
                  {p.name} — {p.price} грн
                </Text>
                <View style={s.row}>
                  <Button title="−" onPress={() => setItems(items.map((x) => x.id === p.id
                ? { ...x, qty: Math.max(0, x.qty - 1) }
                : x))}/>
                  <Text>{p.qty}</Text>
                  <Button title="+" onPress={() => setItems(items.map((x) => x.id === p.id ? { ...x, qty: x.qty + 1 } : x))}/>
                </View>
              </View>))}
          </ScrollView>
          <View style={{ padding: 16 }}>
            <Text style={s.title}>Разом: {total} грн</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>);
}
