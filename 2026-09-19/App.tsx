import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddProductForm from "./src/components/AddProductForm";
import ProductList from "./src/components/ProductList";
import { s } from "./src/styles";
export default function App() {
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        <Text style={s.title}>Продукти</Text>
        <AddProductForm />
        <ProductList />
      </SafeAreaView>
    </SafeAreaProvider>);
}
