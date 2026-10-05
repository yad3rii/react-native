import { FlatList } from "react-native";
import Category from "./Category";
import { CategoryType } from "../data";
export default function CategoryList({ items }: {
    items: CategoryType[];
}) {
    return (<FlatList horizontal data={items} keyExtractor={(c) => c.id} renderItem={({ item }) => <Category item={item}/>}/>);
}
