import { useEffect, useState } from "react";
import * as React from 'react';
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { auth, getCloudData, getCloudDataComments, storeCloudDataComments } from "../misc/Firebase";
import { Button, ScrollView, View, Text, TextInput } from "react-native";
import styles from "../misc/Styles";
import GroupPart from "./GroupPart";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { ICommentArray } from "../logic/Interfaces/ICommentArray";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DropDownComment({ sheetRef, characterId, setComment }: { sheetRef: any, characterId: number, setComment: React.Dispatch<React.SetStateAction<string>> }) {
    const [newComment, setNewComment] = useState<string>("")

    const [allComments, setAllComments] = useState<ICommentArray | null>(null)

    useEffect(() => {
        update()
    }, [characterId])

    const update = () => {
        getCloudDataComments().then((response) => {
            setAllComments(response as ICommentArray)
            if (response.data.length > 0 && response.data.find(item => item.id === characterId)) {
                setNewComment(response.data.find(item => item.id === characterId).comment)
                setComment(response.data.find(item => item.id === characterId).comment)
            }
            console.log("Updated comments data. Raw: ")
            console.log(response.data)
        })
    }





    const renderContent = () => (
        <View style={[styles.dropdownBody]}>
            <TextInput value={newComment}
                onChangeText={(text) => { setNewComment(text) }}
                placeholder="Your comment here..." />
            <Button title="Save"
                onPress={() => {
                    if (allComments) {
                        if (allComments.data.find(item => item.id === characterId)) {
                            allComments.data[allComments.data.findIndex(item => item.id === characterId)].comment = newComment
                        } else {
                            allComments.data.push({
                                id: characterId,
                                comment: newComment
                            })
                        }
                        setComment(newComment)
                        storeCloudDataComments(allComments).then(() => alert("saved")).then(() => update())
                    }
                }}></Button>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    )


    return <>
        <BottomSheet
            ref={sheetRef}
            snapPoints={[0, 500]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={0}
        />
    </>
}