import { FlatList } from "react-native";
import Product from "./Product";
import { ProductType } from "../data";
export default function ProductList({ items }: {
    items: ProductType[];
}) {
    return (<FlatList numColumns={2} data={items} keyExtractor={(p) => p.id} renderItem={({ item }) => <Product item={item}/>}/>);
}
