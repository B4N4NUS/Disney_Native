import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity, Platform, StatusBar, Dimensions } from "react-native";
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
  }, [character]);




  const sheetRef = React.useRef(null);
  const sheetRef2 = React.useRef(null);


  return <View style={styles.characterContainer}>
    <View style={[styles.elivation]}>
      <TouchableOpacity
        style={[styles.elivatedButton]}
        onPress={() => {
          if (sheetRef.current) {
            sheetRef.current.snapTo(0)
          }
          sheetRef2.current.snapTo(1)
        }}
      >
        <Text style={{ textAlign: "center", color: "#3e3e3e" }}>C</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.elivatedButton]}
        onPress={() => {
          if (sheetRef2.current) {
            sheetRef2.current.snapTo(0)
          }
          sheetRef.current.snapTo(1)
        }}
      >
        <Text style={{ textAlign: "center", color: "#3e3e3e" }}>+</Text>
      </TouchableOpacity>
    </View>

    <DropDownGroups sheetRef={sheetRef} character={character.name} />
    <DropDownComment sheetRef={sheetRef2} setComment={setComment} characterId={character._id} />
    <ScrollView style={{ width: "100%" }}>

      {comment && (
        <View style={{ marginTop: 20 }}>
          {/* <Text style={[styles.characterText, { fontSize: 30 }]}>Your Comment</Text> */}
          <Text style={[styles.characterText, { color: "#ff6600", fontSize: 18, }]}>{comment}</Text>
        </View>)}
      <View style={styles.singleImageContainer}>
        <Image style={styles.singleImage} source={{ uri: character.imageUrl }} />
      </View>
      {character.films.length > 0 && (
        <View>
          <Text style={styles.characterTextHeader}>Films</Text>
          <Text style={styles.characterText}>{character.films}</Text>
        </View>)}
      {character.shortFilms.length > 0 && (
        <View>
          <Text style={styles.characterTextHeader}>Short Films</Text>
          <Text style={styles.characterText}>{character.shortFilms}</Text>
        </View>)}
      {character.tvShows.length > 0 && (
        <View>
          <Text style={styles.characterTextHeader}>TV Shows</Text>
          <Text style={styles.characterText}>{character.tvShows}</Text>
        </View>)}
      {character.videoGames.length > 0 && (
        <View>
          <Text style={styles.characterTextHeader}>Games</Text>
          <Text style={styles.characterText}>{character.videoGames}</Text>
        </View>)}
      {character.allies.length > 0 && (
        <View>
          <Text style={styles.characterTextHeader}>Allies</Text>
          <Text style={styles.characterText}>{character.allies}</Text>
        </View>)}
      {character.enemies.length > 0 && (
        <View>
          <Text style={styles.characterTextHeader}>Enemies</Text>
          <Text style={styles.characterText}>{character.enemies}</Text>
        </View>)}

      <View style={{ height: 100 }}></View>
    </ScrollView>
  </View>
}
