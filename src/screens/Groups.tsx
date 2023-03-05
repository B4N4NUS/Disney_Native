import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import GroupPart from "../components/GroupPart";
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { getCloudData, auth } from "../misc/Firebase";

export default function Groups() {
    const [groups, setGroups] = useState<IUserListArray>()
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        getCloudData().then((responce) => {
            setGroups(responce)
            console.log("Got data from server")
            console.log(responce)
        }).catch((e) => alert(e.message))
    }, [auth.currentUser.email, update])

    return <View style={{ backgroundColor: "#303030", height: "100%", }}>
        <ScrollView>
            {groups?.data.map((c,i)=> 
                <GroupPart key={i} index={i} groups={groups} setUpdate={setUpdate} update={update} currentChar={null}></GroupPart>)}
        </ScrollView>
    </View>
}