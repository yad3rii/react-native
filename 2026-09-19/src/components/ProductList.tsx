import { FlatList, Text, View, Button } from "react-native";
import { useProducts } from "../store";
import { s } from "../styles";
export default function ProductList() {
    const items = useProducts((s) => s.products);
    const remove = useProducts((s) => s.removeProduct);
    return (<FlatList data={items} keyExtractor={(p) => String(p.id)} renderItem={({ item }) => (<View style={s.card}>
          <Text>
            {item.title} — {item.price} грн
          </Text>
          <Button title="Видалити" onPress={() => remove(item.id)}/>
        </View>)}/>);
}
