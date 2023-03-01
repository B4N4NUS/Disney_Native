import { useNavigation } from "@react-navigation/native";
import { Button, SafeAreaView, Text, TextInput, View, } from 'react-native';

export default function Login() {
    const navigation = useNavigation()

    return <View style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        justifyContent:"center"
    }}>
        <View style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
        }}>
            <Text>Login</Text>
            <TextInput/>
            <Text>Password</Text>
            <TextInput/>
            <Button 
                onPress={()=>{

                }}
                title="Submit"
            />
        </View>
    </View>
}