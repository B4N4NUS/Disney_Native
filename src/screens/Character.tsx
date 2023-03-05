import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DropDownComment from "../components/DropDownComment";
import DropDownGroups from "../components/DropDownGroups";
import { getCloudData, getCloudDataComments } from "../misc/Firebase";
import styles from "../misc/Styles";



export default function Character({ route, navigation }) {
  const { options } = route.params
  const { character } = route.params
  const [comment, setComment] = useState<string | null>(null)

  useEffect(() => {
    navigation.setOptions({
      title: character.name,
    });
    //   getCloudDataComments().then((responce) => {
    //     setComment(responce?.data.find(item=> item.id === character._id).comment)
    //     console.log("Got comments list from server: " + responce?.data.find(item=> item.id === character._id))
    //     console.log(character._id)
    // }).catch((e) => alert(e.message))
  }, [character]);




  const sheetRef = React.useRef(null);
  const sheetRef2 = React.useRef(null);


  return <>
    <View style={styles.elivation}>
      <TouchableOpacity
        style={[styles.elivatedButton]}
        onPress={() => sheetRef2.current.snapTo(1)}
      >
        <Text style={{ textAlign: "center", color:"#303030" }}>C</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.elivatedButton]}
        onPress={() => sheetRef.current.snapTo(1)}
      >
        <Text style={{ textAlign: "center", color:"#303030"  }}>+</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.characterContainer}>
      <DropDownGroups sheetRef={sheetRef} character={character.name} />
      <DropDownComment sheetRef={sheetRef2} setComment={setComment} characterId={character._id} />
      <ScrollView>

        <Image style={{ height: 400, width: 300 }} source={character.imageUrl ? { uri: character.imageUrl } : require("../../assets/icon.png")} />
        {character.films.length > 0 && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>Films</Text>
            <Text style={styles.characterText}>{character.films}</Text>
          </View>)}
        {character.shortFilms.length > 0 && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>Short Films</Text>
            <Text style={styles.characterText}>{character.shortFilms}</Text>
          </View>)}
        {character.tvShows.length > 0 && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>TV Shows</Text>
            <Text style={styles.characterText}>{character.tvShows}</Text>
          </View>)}
        {character.videoGames.length > 0 && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>Games</Text>
            <Text style={styles.characterText}>{character.videoGames}</Text>
          </View>)}
        {character.allies.length > 0 && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>Allies</Text>
            <Text style={styles.characterText}>{character.allies}</Text>
          </View>)}
        {character.enemies.length > 0 && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>Enemies</Text>
            <Text style={styles.characterText}>{character.enemies}</Text>
          </View>)}
        {comment && (
          <View>
            <Text style={[styles.characterText, { fontSize: 30 }]}>Your Comment</Text>
            <Text style={styles.characterText}>{comment}</Text>
          </View>)}
      </ScrollView>
    </View>
  </>
}
