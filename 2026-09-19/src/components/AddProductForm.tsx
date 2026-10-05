import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useProducts } from "../store";
import { s } from "../styles";
export default function AddProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const add = useProducts((s) => s.addProduct);
    return (<View>
      <TextInput style={s.input} placeholder="Назва" value={title} onChangeText={setTitle}/>
      <TextInput style={s.input} placeholder="Ціна" value={price} onChangeText={setPrice} keyboardType="decimal-pad"/>
      <Button title="Додати" onPress={() => {
            const value = Number(price.replace(",", "."));
            if (!title.trim() || !price || !Number.isFinite(value) || value < 0)
                return;
            add({ id: Date.now(), title, price: value });
            setTitle("");
            setPrice("");
        }}/>
    </View>);
}
