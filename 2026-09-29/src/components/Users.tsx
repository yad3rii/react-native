import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Library } from "../useLibrary";
import { s } from "../styles";
export default function Users({ lib }: {
    lib: Library;
}) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    return (<View>
      <Text>Новий читач</Text>
      <TextInput style={s.input} placeholder="Новий логін" value={name} onChangeText={setName} autoCapitalize="none"/>
      <TextInput style={s.input} placeholder="Новий пароль" value={password} onChangeText={setPassword} secureTextEntry/>
      <Button title="Зареєструвати" onPress={async () => {
            const ok = await lib.register(name, password);
            setMessage(ok ? "Читача додано" : "Заповніть поля, логін має бути унікальним");
            if (ok) {
                setName("");
                setPassword("");
            }
        }}/>
      <Text>{message}</Text>
    </View>);
}
