import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CategoryList from "./src/components/CategoryList";
import ProductList from "./src/components/ProductList";
import { categories, products } from "./src/data";
import { s } from "./src/styles";
export default function App() {
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        <Text style={s.title}>Категорії</Text>
        <View>
          <CategoryList items={categories}/>
        </View>
        <Text style={s.title}>Товари</Text>
        <ProductList items={products}/>
      </SafeAreaView>
    </SafeAreaProvider>);
}
