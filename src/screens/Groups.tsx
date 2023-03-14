import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import GroupPart from "../components/GroupPart";
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { getCloudData, auth } from "../misc/Firebase";
import { useToast } from "react-native-toast-notifications";

// Окно с списком групп, где можно удалять и переименовывать все и вся
export default function Groups() {
    const [groups, setGroups] = useState<IUserListArray>()
    const [update, setUpdate] = useState(false)
    const toast = useToast()

    useEffect(() => {
        getCloudData().then((responce) => {
            setGroups(responce)
            console.log("Got data from server")
            console.log(responce)
        }).catch((e) => toast.show("Can't get data from server", {
            type: "normal",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
        }))
}, [auth.currentUser.email, update])

return <View style={{ backgroundColor: "#303030", height: "100%",paddingTop:10 }}>
    <ScrollView>
        {groups?.data.map((c, i) =>
            <GroupPart key={i} index={i} groups={groups} setUpdate={setUpdate} update={update} currentChar={null}></GroupPart>)}
    </ScrollView>
</View>
}