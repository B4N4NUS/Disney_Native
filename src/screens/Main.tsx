import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from "react-native";
import { ICharacter } from "../logic/Interfaces/ICharacter";
import { ICharacterArray } from "../logic/Interfaces/ICharacterArray";
import { IMainOptions } from "../logic/Interfaces/IMainOptions";
import styles from "../misc/Styles";

const SEARCH_URL = "https://api.disneyapi.dev/character?name="
const ALL_CHARACTERS_URL = "https://api.disneyapi.dev/characters?page=1"

export default function Main({ route, navigation }) {
    // const navigation = useNavigation()
    const userLists = []
    const [characters, setCharacters] = useState<ICharacterArray | null>(null)
    const [searchReq, setSearchReq] = useState("")

    const { options } = route.params

    useEffect(() => {
        search()
    }, [])

    const search = () => {
        console.log(options.login)
        fetch(searchReq === "" ? ALL_CHARACTERS_URL : SEARCH_URL + searchReq).then((responce) => responce.json()).then((json) => {
            parseCharacters(json)
            // console.log(json)
        })
    }




    const parseCharacters = (json) => {
        console.log("parsing")
        let chars: ICharacterArray = { data: [] }
        for (let i = 0; i < json.count; i++) {
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
    }

    return <View style={{ backgroundColor: "#303030", height: "100%", }}>

        <SafeAreaView style={styles.androidSafeArea}>

            <View style={[styles.containerRow, { backgroundColor: "#ff6600" }]}>
                <Text style={{ flex: 0.5, fontSize: 22, color: "#303030", margin: 10 }}>Disney</Text>
                <TextInput style={[styles.searchBar, { flex: 1 }]}
                    onChangeText={(text) => {
                        setSearchReq(text)
                    }}
                    onSubmitEditing={()=> {
                        search()
                    }}
                    placeholder="Search..."
                    placeholderTextColor="#303030"
                />
            </View>

            <View style={[styles.elivation, { top: 60 + (Platform.OS === "android" ? StatusBar.currentHeight : 0) }]}>
                <TouchableOpacity
                    style={[styles.elivatedButton]}
                    onPress={() => navigation.navigate("Groups")}
                >
                    <Text style={{ textAlign: "center", color: "#303030" }}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={characters ? characters.data : []}
                numColumns={3}
                initialNumToRender={10}
                maxToRenderPerBatch={2}
                onEndReachedThreshold={0.1}
                style={{
                    backgroundColor: "#303030"
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Character", { options: options, character: item })
                        }}
                        style={styles.listItem}
                    >
                        <Text numberOfLines={1} style={styles.listText}>{item.name}</Text>
                        <Image style={styles.listImage} source={item.imageUrl ? { uri: item.imageUrl } : {uri: "https://static.wikia.nocookie.net/disney/images/7/7c/Noimage.png"}} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView >
    </View>
}