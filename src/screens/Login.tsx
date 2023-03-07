import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import React from "react";
import { Switch, Text, TextInput, View} from 'react-native';
import styles from "../misc/Styles";
import { IMainOptions } from "../logic/Interfaces/IMainOptions";
import { auth} from "../misc/Firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";

export default function Login() {
    const navigation = useNavigation()
    const [saveLogin, setSaveLogin] = useState(false)
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const toast = useToast()

    let mainOptions: IMainOptions = {
        login: "",
        pass: "",
    }

    // Высасывание из локального хранилища логина и пароля
    useEffect(() => {
        getData().then(response => {
            if (response) {
                setLogin(response.login)
                setPass(response.pass)
                setSaveLogin(true)
                handleLogin({ login: response.login, pass: response.pass })

            }
        }).catch(() => toast.show("Can't load local data", {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          }))
    }, [])

    // Обращение к асинкстораджу
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@storage_key")
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
            console.log(e)
        }
    }

    // Запись в асинксторадж
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("@storage_key", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    // Обработка входа в аккаунт под введенными данными
    const handleLogin = (mainOptions: IMainOptions) => {
        auth.signInWithEmailAndPassword(mainOptions.login, mainOptions.pass).then(userCredentials => {
            const user = userCredentials.user
            console.log("Logged in with: " + user.email)
            // mainOptions.login = login
            // mainOptions.pass = pass

            if (saveLogin) {
                storeData({ login: mainOptions.login, pass: mainOptions.pass })
            } else {
                storeData(null)
            }

            navigation.navigate("Main", { options: mainOptions, })
        }).catch(error => toast.show("Wrong email or password", {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          }))
    }

    // Регистрация нового аккаунта по введенным данным
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(login, pass).then(userCredentials => {
            const user = userCredentials.user
            console.log("Registered with: " + user.email)
            navigation.navigate("Main", { options: mainOptions, })
        }).catch(error => toast.show("Network error", {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          }))
    }

    return <View style={styles.containerCol}>
        <TextInput style={styles.textInput} placeholder="Email..." value={login} onChangeText={(text) => {
            setLogin(text)
        }} />
        <TextInput style={styles.textInput} placeholder="Password..." value={pass} onChangeText={(text) => {
            setPass(text)
        }} secureTextEntry={true} />
        <View style={styles.containerRow}>
            <Text style={{color:"white"}}>Save Password</Text>

            <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={saveLogin ? '#ff6600' : '#f4f3f4'}
                value={saveLogin}
                onValueChange={() => {
                    setSaveLogin(!saveLogin)
                }}
            />
        </View>

        <View >
            <TouchableOpacity
                onPress={() => {
                    handleLogin({ login: login, pass: pass })
                }}
                style={[styles.loginButton, { backgroundColor: "#ff6600" }]}
            >
                <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    handleSignUp()
                }}
                style={[styles.loginButton, { backgroundColor: "white" }]}
            >
                <Text style={{ color: "#ff6600" }}>Register</Text>
            </TouchableOpacity>
        </View>
    </View>
}