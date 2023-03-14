import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import { Platform, StatusBar } from "react-native";
import ChangePassword from "../screens/ChangePassword";
import Character from "../screens/Character";
import Groups from "../screens/Groups";
import Login from "../screens/Login";
import Main from "../screens/Main";
import Settings from "../screens/Settings";

const Stack = createStackNavigator()

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

// Обертка над навигатором
export default function Navigate() {
    const mainOptions = {
        headerShown: false,
        cardStyleInterpolator: forFade
    }
    const characterOptions = {
        headerStyle: {
            backgroundColor: '#ff6600',
            height: 50 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
        },
        headerTintColor: '#303030',
        cardStyleInterpolator: forFade
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                cardOverlayEnabled: true,
                // animationEnabled: false,
            }}>
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false,
                    cardStyleInterpolator: forFade
                }} />
                <Stack.Screen name="Main" component={Main} options={mainOptions} />
                <Stack.Screen name="Character" component={Character} options={characterOptions} />
                <Stack.Screen name="Groups" component={Groups} options={characterOptions} />
                <Stack.Screen name="Settings" component={Settings} options={characterOptions} />
                <Stack.Screen name="Change Password" component={ChangePassword} options={characterOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}