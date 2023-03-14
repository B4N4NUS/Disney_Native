import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import * as React from 'react';
import styles from "../misc/Styles";
import { auth } from "../misc/Firebase";
import { deleteUser } from "firebase/auth";
import { storeData } from "../misc/AsyncStorage";
import { useToast } from "react-native-toast-notifications";

export default function Settings({ navigation }) {
    const toast = useToast()

    return (
        <SafeAreaView style={[styles.androidSafeArea, {height:"100%", justifyContent:"center", backgroundColor: "#303030"}]}>

            <View>
                <TouchableOpacity style={styles.settingsButton} onPress={() => {
                    navigation.navigate("Change Password")
                }}>
                    <Text style={{color:"white", textAlign:"center"}}>
                        Change Password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsButton} onPress={() => {
                    storeData(null).then(() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })).catch((e) => alert(e.message))

                }}>
                    <Text style={{color:"white", textAlign:"center"}}>
                        Logout
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.settingsButton, { backgroundColor:"white"}]} onPress={() => {
                    const user = auth.currentUser;
                    deleteUser(user).then(() => {
                        navigation.navigate("Login")
                        toast.show("User deleted!", {
                            type: "normal",
                            placement: "top",
                            duration: 2000,
                            animationType: "slide-in",
                        })
                    }).catch((error) => {
                        navigation.navigate("Login")
                        toast.show("Cant delete your account because of the " + error.message, {
                            type: "normal",
                            placement: "top",
                            duration: 2000,
                            animationType: "slide-in",
                        })
                    });
                }}>
                    <Text style={{color:"#ff6600", textAlign:"center"}}>
                        Delete Account
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}