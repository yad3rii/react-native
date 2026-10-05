import { View, Text, Button } from "react-native";
import { ProductType } from "../data";
import { s } from "../styles";
export default function Product({ item }: {
    item: ProductType;
}) {
    return (<View style={[s.card, { flex: 1 }]}>
      <Text style={{ fontSize: 48 }}>{item.emoji}</Text>
      <Text>{item.title}</Text>
      <Text>{item.price} грн/кг</Text>
      <Text>⭐ 4.8</Text>
      <Button title="Додати" onPress={() => { }}/>
    </View>);
}
