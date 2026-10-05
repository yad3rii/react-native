import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Books from "./src/Books";
import { s } from "./src/styles";
export default function App() {
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        <Text style={s.title}>Книги SQLite</Text>
        <Books />
      </SafeAreaView>
    </SafeAreaProvider>);
}
