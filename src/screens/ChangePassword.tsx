import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import * as React from 'react';
// import { auth, getProfile, storeProfile } from "../../misc/Firebase";
import firebase from "firebase/compat/app";
import { StackActions } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { storeData } from "../misc/AsyncStorage";
import { TextInput } from "react-native-gesture-handler";
import styles from "../misc/Styles";
import { auth } from "../misc/Firebase";

export default function ChangePassword({ route, navigation }) {
    const toast = useToast()
    const [pass, setPass] = React.useState("")
    const [newPass2, setNewPass2] = React.useState("")
    const [newPass, setNewPass] = React.useState("")
    const [user, setUser] = React.useState("")

    React.useEffect(() => {
        setUser(auth.currentUser.email)
    }, [auth.currentUser])

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword).then((response) => {
            if (newPass === newPass2) {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    navigation.dispatch(StackActions.pop(1))
                    storeData({ login: user.email, pass: newPass }).then(() => toast.show("Updated password!", {
                        type: "normal",
                        placement: "top",
                        duration: 2000,
                        animationType: "slide-in",
                    }))
                }).catch((error) => { toast.show(error.message, {
                    type: "normal",
                    placement: "top",
                    duration: 2000,
                    animationType: "slide-in",
                })});
            } else {
                toast.show("Missmatching passwords", {
                    type: "normal",
                    placement: "top",
                    duration: 2000,
                    animationType: "slide-in",
                })
            }
        }).catch((error) => {
            toast.show(error.message, {
                type: "normal",
                placement: "top",
                duration: 2000,
                animationType: "slide-in",
            })
        });
    }

    return (
        <SafeAreaView style={[styles.androidSafeArea, { height: "100%", justifyContent: "center", backgroundColor: "#303030" }]}>
            <View style={{ alignContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 60 }}>
                <Text style={{ color: "#ff6600", fontSize: 12, alignSelf: "center", textAlign: "center" }}>
                    Current Email
                </Text>
                <Text style={{ color: "#ff6600", fontSize: 24, alignSelf: "center", textAlign: "center" }}>
                    {user}
                </Text>
            </View>


            <TextInput style={styles.wideInput} placeholder={"Old Password..."} secureTextEntry={true} onChangeText={(text) => {
                setPass(text)
            }} />

            <TextInput style={styles.wideInput} placeholder={"New Password..."} secureTextEntry={true} onChangeText={(text) => {
                setNewPass(text)
            }} />
            <TextInput style={styles.wideInput} placeholder={"Repeat New Password..."} secureTextEntry={true} onChangeText={(text) => {
                setNewPass2(text)
            }} />

            <TouchableOpacity style={styles.settingsButton} onPress={() => {
                changePassword(pass, newPass)
            }}>
                <Text style={{ color: "white", textAlign: "center" }}>
                    Save
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}