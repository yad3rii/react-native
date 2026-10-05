import { useState } from "react";
import { Text, Button, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLibrary } from "./src/useLibrary";
import Login from "./src/components/Login";
import Books from "./src/components/Books";
import Users from "./src/components/Users";
import { s } from "./src/styles";
export default function App() {
    const lib = useLibrary();
    const [users, setUsers] = useState(false);
    return (<SafeAreaProvider>
      <SafeAreaView style={s.screen}>
        {lib.error ? (<Text>{lib.error}</Text>) : !lib.ready ? (<ActivityIndicator />) : !lib.user ? (<Login lib={lib}/>) : (<>
            <Text style={s.title}>Бібліотека · {lib.user.name}</Text>
            {lib.user.role === "admin" ? (<Button title={users ? "Книги" : "Реєстрація читача"} onPress={() => setUsers(!users)}/>) : null}
            {users && lib.user.role === "admin" ? (<Users lib={lib}/>) : (<Books lib={lib}/>)}
            <Button title="Вийти" onPress={() => {
                setUsers(false);
                void lib.logout();
            }}/>
          </>)}
      </SafeAreaView>
    </SafeAreaProvider>);
}
