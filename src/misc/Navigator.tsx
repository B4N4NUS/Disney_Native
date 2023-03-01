import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import Character from "../components/Character";
import ListOfCharacters from "../components/ListOfCharacters";
import Login from "../components/Login";
import Main from "../components/Main";

const Stack = createStackNavigator()

export default function Navigate() {
    const mainOptions = {

    }
    const characterOptions = {

    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={Main} options={mainOptions} />
                <Stack.Screen name="Character" component={Character} options={characterOptions} />
                <Stack.Screen name="ListOfCharacters" component={ListOfCharacters} options={characterOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}