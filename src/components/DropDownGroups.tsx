import { useEffect, useState } from "react";
import * as React from 'react';
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { auth, getCloudData, storeCloudData } from "../misc/Firebase";
import { Button, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../misc/Styles";
import GroupPart from "./GroupPart";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

export default function DropDownGroups({ sheetRef, character }: { sheetRef: any, character: string }) {
    const [groups, setGroups] = useState<IUserListArray | null>(null)
    const [visibleGroups, setVisibleGroups] = useState<IUserListArray | null>(null)
    const [search, setSearch] = useState("")
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        getCloudData().then((responce) => {
            if (search != "") {
                let newGroups: IUserListArray = { data: [] }
                for (let i = 0; i < responce.data.length; i++) {
                    if (responce.data[i].key.toLowerCase().includes(search.toLowerCase())) {
                        newGroups.data.push(responce.data[i])
                    }
                }
                setVisibleGroups(newGroups)
                console.log("Changed visible groups to: ")
                console.log(newGroups)
            } else {
                setVisibleGroups(responce)
                console.log("Changed visible groups to: " )
                console.log(responce)
            }
            setGroups(responce)
            console.log("Got data from server")
            console.log(responce)
        }).catch((e) => alert(e.message))
    }, [auth.currentUser.email, update])




    const renderContent = () => (
        <View style={[styles.dropdownBody]}>
            <View style={styles.containerRow}>
                <TextInput style={[styles.searchBar, { flex: 1 }]} placeholder="Search..." value={search} onChangeText={(text) => {
                    setSearch(text)
                    setUpdate(!update)
                }}></TextInput>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => {
                        if (search === "") {
                            alert("Can't name groups <blank>")
                            return
                        }
                        if (groups.data.find(item => item.key === search)) {
                            alert("Group " + search + " already exists")
                            return
                        }
                        groups.data.push({ data: [], key: search })
                        storeCloudData(groups)
                        setGroups(groups)
                        setUpdate(!update)
                    }}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {groups && visibleGroups?.data?.map((c, i) =>
                    <GroupPart index={i} groups={groups} currentChar={character} setUpdate={setUpdate} update={update} key={i}></GroupPart>
                )}
                {/* {visibleGroups && visibleGroups.data && visibleGroups?.data?.map((c, i) =>
                    <GroupPart index={groups.data.findIndex(item => item.key === visibleGroups.data[i].key)} groups={groups} currentChar={character} key={i}></GroupPart>
                )} */}
            </ScrollView>
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