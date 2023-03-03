import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import React from "react";
import { Button, StyleSheet, SafeAreaView, Switch, Text, TextInput, View, } from 'react-native';
import styles from "../misc/Styles";
import { IMainOptions } from "../logic/Interfaces/IMainOptions";
import { auth, db, doc, getDoc, setDoc } from "../misc/Firebase";
import { IUserListArray } from "../logic/Interfaces/IUserListArray";

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
        // TODO SAVE LOAD
    })

    const getCloudData = async () => {
        try {
            const docRef = doc(db, "users", auth.currentUser.email)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                return docSnap.data().data
            } else {
                console.log("No such document")
            }
        } catch (e) {
            alert(e.message)
        }
    }

    const aboba: IUserListArray = {
        data: [{
            data: [1,2,3],
            key: "sdoasdw"
        },{
            data: [3,4,5],
            key: "dfgd"
        }]
    }

    const storeCloudData = async (value: IUserListArray) => {
        try {
            const docRef = await setDoc(doc(db, "users", auth.currentUser.email), {
                data: value
            })
        } catch (e) {
            alert(e.message)
        }
    }

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(login, pass).then(userCredentials => {
            const user = userCredentials.user
            console.log("Logged in with: " + user.email)
            mainOptions.login = login
            mainOptions.pass = pass
            console.log(getCloudData())
            storeCloudData(aboba)
            navigation.navigate("Main", {options: mainOptions,})
        }).catch(error => alert(error.message))
    }
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(login, pass).then(userCredentials => {
            const user = userCredentials.user
            console.log("Registered with: " + user.email)
            mainOptions.login = login
            mainOptions.pass = pass
            navigation.navigate("Main", {options: mainOptions,})
        }).catch(error => alert(error.message))
    }

    return <View style={styles.containerCol}>
        <Text>Login</Text>
        <TextInput style={styles.text} onChangeText={(text) => {
            setLogin(text)
        }}/>
        <Text>Password</Text>
        <TextInput style={styles.text} onChangeText={(text) => {
            setPass(text)
        }}/>
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
                    handleLogin()
                    // navigation.navigate("Main", {options: mainOptions,})
                }}
                title="Submit"
            />
            <Button
                onPress={() => {
                    handleSignUp()
                    // navigation.navigate("Main", {options: mainOptions},)
                }}
                title="Register"
            />
        </View>
    </View>
}