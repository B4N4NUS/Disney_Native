import { useEffect, useState } from "react";
import * as React from 'react';
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { auth, getCloudData, storeCloudData } from "../misc/Firebase";
import { View, Text, Dimensions } from "react-native";
import styles from "../misc/Styles";
import GroupPart from "./GroupPart";

import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

// Дропдаун со списком групп
export default function DropDownGroups({ sheetRef, character }: { sheetRef: any, character: string }) {
    const [groups, setGroups] = useState<IUserListArray | null>(null)
    const [visibleGroups, setVisibleGroups] = useState<IUserListArray | null>(null)
    const [search, setSearch] = useState("")
    const [update, setUpdate] = useState(false)
    const toast = useToast()

    useEffect(() => {
        // Вытаскиваем данные по группам с сервера и парсим их на видимые для пользователя относительно содержимого строки поиска
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
                console.log("Changed visible groups to: ")
                console.log(responce)
            }
            setGroups(responce)
            console.log("Got data from server")
            console.log(responce)
        }).catch((e) => toast.show("Can't Load Groups", {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
        }))
    }, [auth.currentUser.email, update])

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    )

    const snapPoints = React.useMemo(() => ["40%", "70%"], []);

    return <>
        <BottomSheet
            ref={sheetRef}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            index={-1}
            backgroundComponent={renderHeader}
            backdropComponent={null}
            handleIndicatorStyle={{ display: "none" }}
        >
            <View style={styles.header}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
            <View style={[styles.dropdownBody]}>
                <View style={styles.containerRow}>
                    <TextInput style={[styles.searchBar, { color: "white", flex: 1, borderColor: "white", }]}
                        placeholder="Search..."
                        value={search}
                        placeholderTextColor="white"
                        onChangeText={(text) => {
                            setSearch(text)
                            setUpdate(!update)
                        }}></TextInput>
                    <TouchableOpacity style={styles.addButton}
                        onPress={() => {
                            // Обработка создание группы без названия
                            if (search === "") {
                                toast.show("Can't name group <blank>", {
                                    type: "normal",
                                    placement: "top",
                                    duration: 2000,
                                    animationType: "slide-in",
                                })
                                return
                            }
                            // Обработка создания группы с уже существующим в бд названием
                            if (groups.data.find(item => item.key === search)) {
                                toast.show("Group " + search + " already exists", {
                                    type: "normal",
                                    placement: "top",
                                    duration: 2000,
                                    animationType: "slide-in",
                                })
                                return
                            }
                            // Добавляем новую группу и отсылаем все на сервак
                            groups.data.push({ data: [], key: search })
                            storeCloudData(groups)
                            setGroups(groups)
                            // Обновляем спикок групп с сервера
                            setUpdate(!update)
                        }}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheetFlatList
                    style={{ maxHeight: Dimensions.get("window").height * 0.5 - 45 }}
                    data={groups?.data}
                    renderItem={({ item, index }) => {
                        if (search === "" || item.key.toUpperCase().includes(search.toUpperCase().trim().replace(/\s/g, ""))) {
                            return <GroupPart index={index} groups={groups} currentChar={character} setUpdate={setUpdate} update={update} key={index}></GroupPart>
                        }
                    }
                    }
                    keyExtractor={(item) => item.key}
                />
            </View>
        </BottomSheet>
    </>
}