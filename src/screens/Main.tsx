import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar, ActivityIndicator, Dimensions } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { ICharacterArray } from "../logic/Interfaces/ICharacterArray";
import styles from "../misc/Styles";

const SEARCH_URL = "https://api.disneyapi.dev/character?name="
const ALL_CHARACTERS_URL = "https://api.disneyapi.dev/characters?page=1"

// Главное окно приложения со списком всех персонажей
export default function Main({ navigation }) {
    const [characters, setCharacters] = useState<ICharacterArray | null>(null)
    const [searchReq, setSearchReq] = useState("")
    const [loading, setLoading] = React.useState(false)
    const toast = useToast()

    useEffect(() => {
        search()
    }, [])

    // Запрос к ресту для получения всех персонажей по введенному имени
    const search = () => {
        setCharacters(null)
        setLoading(true)
        fetch(searchReq === "" ? ALL_CHARACTERS_URL : SEARCH_URL + searchReq).then((responce) => responce.json()).then((json) => {
            console.log("fetched")
            parseCharacters(json)
        })
    }

    // Парс json'чика в полноценный объект
    const parseCharacters = (json) => {
        console.log("parsing")
        let chars: ICharacterArray = { data: [] }
        if (json.count > 201) {
            toast.show("To much characters! Only 201 would be displayed", {
                type: "normal",
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
            })
        }
        for (let i = 0; i < (json.count > 201 ? 201 : json.count); i++) {
            chars.data.push({
                allies: json.data[i].allies,
                enemies: json.data[i].enemies,
                films: json.data[i].films,
                imageUrl: json.data[i].imageUrl,
                name: json.data[i].name,
                partAttractions: json.data[i].partAttractions,
                shortFilms: json.data[i].shortFilms,
                tvShows: json.data[i].tvShows,
                url: json.data[i].url,
                videoGames: json.data[i].videoGames,
                _id: json.data[i]._id,
            })
        }
        console.log("chars length " + chars.data.length)
        setCharacters(chars)
        setLoading(false)
    }

    return <SafeAreaView style={[styles.androidSafeArea, { height: "100%" }]}>
        <View style={{
            position: "absolute",
            zIndex: 2,
            right: 10,
            // marginBottom: 20,
            bottom:10
        }}>
            <TouchableOpacity
                style={[styles.elivatedButton]}
                onPress={() => navigation.navigate("Groups")}
            >
                <Text style={{ textAlign: "center", color: "#303030" }}>G</Text>
            </TouchableOpacity>
        </View>

        <View style={{
            position: "absolute",
            zIndex: 2,
            left: 10,
            // marginBottom: 20,
            bottom:10
        }}>
            <TouchableOpacity
                style={[styles.elivatedButton]}
                onPress={() => navigation.navigate("Settings")}
            >
                <Text style={{ textAlign: "center", color: "#303030" }}>S</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.containerRow, { backgroundColor: "#ff6600" }]}>
            <Text style={{ flex: 0.5, fontSize: 22, color: "#303030", margin: 10 }}>Disney</Text>
            <TextInput style={[styles.searchBar, { flex: 1 }]}
                onChangeText={(text) => {
                    setSearchReq(text)
                }}
                onSubmitEditing={() => {
                    search()
                }}
                placeholder="Search..."
                placeholderTextColor="#303030"
            />
        </View>

        {loading && <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 200 }}>
            <ActivityIndicator size={"large"} color={"#ff6600"} style={{ alignSelf: "center", top: Dimensions.get("window").height / 2, left: Dimensions.get("window").width / 2 - 10,transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }} />
        </View>}

        <FlatList
            data={characters?.data}
            numColumns={3}
            initialNumToRender={10}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.1}
            style={{
                backgroundColor: "#303030",
                paddingBottom: 20,
                flex: 1
                // marginBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
            renderItem={({ item, index }) => <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Character", { character: item })
                }}
                style={styles.listItem}
            >
                <Text numberOfLines={1} style={styles.listText}>{item.name}</Text>
                <Image style={styles.listImage} source={item.imageUrl ? { uri: item.imageUrl } : { uri: "https://static.wikia.nocookie.net/disney/images/7/7c/Noimage.png" }} />
            </TouchableOpacity>
            }
        />
    </SafeAreaView >
}