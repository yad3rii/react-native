import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
    screen: { flex: 1, padding: 16, gap: 10 },
    row: { flexDirection: "row", gap: 10, alignItems: "center" },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        margin: 4,
    },
    input: { borderWidth: 1, borderColor: "#aaa", padding: 8, marginVertical: 4 },
    title: { fontSize: 22, fontWeight: "bold" },
    image: { width: 100, height: 100 },
    grid: { flexDirection: "row", flexWrap: "wrap" },
});
