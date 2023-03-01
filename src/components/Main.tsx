import { useNavigation } from "@react-navigation/native";

export default function Main() {
    const navigation = useNavigation()
    return <div>
        <a>Main</a>
        <button onClick={() => {
            navigation.navigate("Login")
        }}></button>
    </div>
}