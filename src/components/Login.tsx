import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, SafeAreaView, Switch, Text, TextInput, View, } from 'react-native';

export default function Login() {
    const navigation = useNavigation()
    const [saveLogin, setSaveLogin] = useState(false)

    return <View style={styles.containerCol}>
        <Text>Login</Text>
        <TextInput style={styles.text} />
        <Text>Password</Text>
        <TextInput style={styles.text} />
        <View style={styles.containerRow}>
            <Text>Save Password</Text>

            <Switch
                value={saveLogin}
                onValueChange={() => {
                    setSaveLogin(!saveLogin)
                }}
            />
        </View>

        <View style={styles.containerRow}>
            <Button
                onPress={() => {
                    navigation.navigate("Main")
                }}
                title="Submit"
            />
            <Button
                onPress={() => {
                    navigation.navigate("Main")
                }}
                title="Register"
            />
        </View>
    </View>
}



const styles = StyleSheet.create({
    containerRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    containerCol: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center"
    },
    text: {
        margin: 5,
        borderWidth: 2,
        borderColor: "black"
    }
});