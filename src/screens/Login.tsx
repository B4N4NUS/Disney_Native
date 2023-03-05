import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { Button, StyleSheet, SafeAreaView, Switch, Text, TextInput, View, Dimensions, } from 'react-native';
import styles from "../misc/Styles";
import { IMainOptions } from "../logic/Interfaces/IMainOptions";
import { auth, db, doc, getDoc, setDoc, storeCloudDataComments } from "../misc/Firebase";
import { IUserListArray } from "../logic/Interfaces/IUserListArray";

import { Value } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { UserListsContext } from "../../App";

export default function Login() {
    const navigation = useNavigation()
    const [saveLogin, setSaveLogin] = useState(false)
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")

    let mainOptions: IMainOptions = {
        login: "",
        pass: "",
    }

    useEffect(() => {
        getData().then(response => {
            if (response) {
                setLogin(response.login)
                setPass(response.pass)
                setSaveLogin(true)
                // alert(response.login + " " + response.pass)
                handleLogin({ login: response.login, pass: response.pass })

            }
        })
        // TODO SAVE LOAD
    }, [])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@storage_key")
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
            console.log(e)
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("@storage_key", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }


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
        }).catch(error => alert(error.message + "\n" + mainOptions.login + " " + mainOptions.pass))
    }
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(login, pass).then(userCredentials => {
            const user = userCredentials.user
            console.log("Registered with: " + user.email)
            mainOptions.login = login
            mainOptions.pass = pass
            navigation.navigate("Main", { options: mainOptions, })
        }).catch(error => alert(error.message))
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
                    // navigation.navigate("Main", {options: mainOptions,})
                }}
                style={[styles.loginButton, { backgroundColor: "#ff6600" }]}
            >
                <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    handleSignUp()
                    // navigation.navigate("Main", {options: mainOptions},)
                }}
                style={[styles.loginButton, { backgroundColor: "white" }]}
            >
                <Text style={{ color: "#ff6600" }}>Register</Text>
            </TouchableOpacity>
        </View>
    </View>
}