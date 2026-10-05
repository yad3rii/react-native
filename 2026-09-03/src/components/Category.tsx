import { View, Text } from "react-native";
import { CategoryType } from "../data";
export default function Category({ item }: {
    item: CategoryType;
}) {
    return (<View style={{ width: 80, alignItems: "center", margin: 4 }}>
      <Text style={{
            fontSize: 32,
            backgroundColor: item.color,
            padding: 8,
            borderRadius: 10,
        }}>
        {item.image}
      </Text>
      <Text style={{ textAlign: "center" }}>{item.name}</Text>
    </View>);
}
