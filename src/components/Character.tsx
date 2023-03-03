import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "../misc/Styles";

export default function Character({ route, navigation }) {
    const { options } = route.params
    const { character } = route.params

    useEffect(() => {
        navigation.setOptions({
          title: character.name,
        });
      }, [character]);

    return <View>
        <View style={styles.containerCol}>
            <Image style={{ height: 400, width: 300 }} source={character.imageUrl ? { uri: character.imageUrl } : require("../../assets/icon.png")} />
            {character.films.length > 0 && <Text>{"Films: "+ character.films}</Text>}
            {character.shortFilms.length > 0 && <Text>{"Short Films: " + character.shortFilms}</Text>}
            {character.tvShows.length > 0 && <Text>{"TV Shows: " + character.tvShows}</Text>}
            {character.videoGames.length > 0 && <Text>{"Games: " + character.videoGames}</Text>}
            {character.allies.length > 0 && <Text>{"Allies: " + character.allies}</Text>}
            {character.enemies.length > 0 && <Text>{"Enemies: " + character.enemies}</Text>}
        </View>

    </View>
}