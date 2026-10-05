import { useState } from "react";
import { View, Text, Button, Image, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { products } from "./src/data";
import { useShop } from "./src/store";
import { s } from "./src/styles";
const Stack = createNativeStackNavigator();
function Home({ navigation, onlyLiked = false, }: {
    navigation: any;
    onlyLiked?: boolean;
}) {
    const [query, setQuery] = useState("");
    const liked = useShop((s) => s.liked);
    const like = useShop((s) => s.like);
    return (<ScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput style={s.input} placeholder="Search" value={query} onChangeText={setQuery}/>
      {products
            .filter((p) => (!onlyLiked || liked.includes(p.id)) &&
            p.title.toLowerCase().includes(query.toLowerCase()))
            .map((p) => (<View key={p.id} style={s.card}>
            <Pressable onPress={() => navigation.navigate("Product", { id: p.id })}>
              <Image source={p.image} style={s.image} resizeMode="contain"/>
              <Text>{p.title} — ${p.price}</Text>
            </Pressable>
            <Button title="Відкрити" onPress={() => navigation.navigate("Product", { id: p.id })}/>
            <Button title={liked.includes(p.id) ? "♥" : "♡"} onPress={() => like(p.id)}/>
          </View>))}
      <Button title="Кошик" onPress={() => navigation.navigate("Bag")}/>
    </ScrollView>);
}
function Like({ navigation }: {
    navigation: any;
}) {
    return <Home navigation={navigation} onlyLiked/>;
}
function Product({ route, navigation }: {
    route: any;
    navigation: any;
}) {
    const p = products.find((p) => p.id === route.params.id)!;
    const add = useShop((s) => s.add);
    return (<View style={s.screen}>
      <Image source={p.image} style={{ width: 200, height: 200 }} resizeMode="contain"/>
      <Text style={s.title}>{p.title}</Text>
      <Text>${p.price}</Text>
      <Button title="Додати в кошик" onPress={() => {
            add(p.id);
            navigation.navigate("Bag");
        }}/>
    </View>);
}
function Bag() {
    const cart = useShop((s) => s.cart);
    const items = cart.map((id) => products.find((p) => p.id === id)!);
    return (<ScrollView contentContainerStyle={s.screen}>
      {items.map((p, i) => (<Text key={i}>
          {p.title} — ${p.price}
        </Text>))}
      <Text>Разом: ${items.reduce((sum, p) => sum + p.price, 0)}</Text>
    </ScrollView>);
}
function Profile() {
    return <Text>Профіль: Анна</Text>;
}
const Tab = createBottomTabNavigator();
function Tabs() {
    return (<Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Search" component={Home}/>
      <Tab.Screen name="Like" component={Like}/>
      <Tab.Screen name="Bag" component={Bag}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>);
}
export default function App() {
    return (<SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Shop" component={Tabs} options={{ headerShown: true, title: "AURA SHOP" }}/>
          <Stack.Screen name="Product" component={Product}/>
          <Stack.Screen name="Bag" component={Bag}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>);
}
