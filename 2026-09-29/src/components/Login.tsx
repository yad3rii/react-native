import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Library } from "../useLibrary";
import { s } from "../styles";
export default function Login({ lib }: {
    lib: Library;
}) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    return (<View style={s.screen}>
      <Text style={s.title}>Вхід</Text>
      <TextInput style={s.input} placeholder="Логін" value={name} onChangeText={setName} autoCapitalize="none"/>
      <TextInput style={s.input} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry/>
      <Button title="Увійти" onPress={async () => {
            if (!(await lib.login(name, password)))
                setError("Невірний логін або пароль");
        }}/>
      <Text>{error}</Text>
    </View>);
}
