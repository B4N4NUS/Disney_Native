import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../misc/Styles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ICharacterArray } from "../logic/Interfaces/ICharacterArray";
import { ICustomList } from "../logic/Interfaces/ICustomList";
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { storeCloudData } from "../misc/Firebase";
import {useToast} from "react-native-toast-notifications";

export default function GroupPart({ index, groups, currentChar, setUpdate, update }: { index: number, groups: IUserListArray, currentChar: string | null, setUpdate: React.Dispatch<React.SetStateAction<boolean>>, update: boolean }) {
    const [canAdd, setCanAdd] = useState(true)
    const [canDelete, setCanDelete] = useState(false)
    const [showChars, setShowChars] = useState(false)
    const [text, setText] = useState("")
    const toast = useToast()

    useEffect(() => {
        setText(groups.data[index].key)
        if (groups.data[index].data.find(item => item === currentChar) || currentChar === null) {
            setCanAdd(false)
        } else {
            setCanAdd(true)
        }
        if (currentChar === null) {
            setCanDelete(true)
        }
    }, [groups, currentChar, index])

    const deleteCharacter = (i: number) => {
        toast.show(groups.data[index].data[i] + " was deleted from " + groups.data[index].key, {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          })

        groups.data[index].data.splice(i, 1)
        storeCloudData(groups)
        setUpdate(!update)
    }

    const deleteGroup = () => {
        toast.show(groups.data[index].key+ " was deleted", {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          })

        groups.data.splice(index, 1)
        storeCloudData(groups)
        setUpdate(!update)
    }

    const updateGroupName = (name) => {
        toast.show("Changed "+groups.data[index].key + "'s name to " + name, {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          })
        groups.data[index].key = name
        storeCloudData(groups)
        setUpdate(!update)
    }

    return <>
        <View style={styles.containerRow}>
            <TouchableOpacity style={styles.addButton}
                onPress={() => {
                    setShowChars(!showChars)
                }}>
                <Text style={styles.addButtonText}>{showChars ? "^" : "⌄"}</Text>
            </TouchableOpacity>


            {(currentChar === null) ?
                <TextInput
                    style={{ flex: 1, color: "white", fontSize: 18, }}
                    value={text}
                    onSubmitEditing={() => {
                        updateGroupName(text)
                    }}
                    onChangeText={(ntext) => {setText(ntext)}}/> :
                <Text
                    style={{ flex: 1, color: "white", fontSize: 18, }}>
                    {groups.data[index].key}
                </Text>}
            {canAdd && <TouchableOpacity style={styles.addButton}
                onPress={() => {
                    setCanAdd(false)
                    groups.data[index].data.push(currentChar)
                    storeCloudData(groups)
                }}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>}
            {canDelete && <TouchableOpacity style={styles.addButton}
                onPress={() => {
                    deleteGroup()
                }}>
                <Text style={styles.addButtonText}>-</Text>
            </TouchableOpacity>}
        </View>
        {showChars && <View >
            {groups?.data[index].data.map((c, i) =>
                <View style={{ flexDirection: "row", display: "flex" }} key={i}>
                    <Text style={styles.groupListText}>{"- " + c}</Text>
                    {canDelete && <TouchableOpacity style={styles.addButton}
                        onPress={() => {
                            deleteCharacter(i)
                        }}>
                        <Text style={styles.addButtonText}>-</Text>
                    </TouchableOpacity>}
                </View>
            )}
        </View>}
    </>
}