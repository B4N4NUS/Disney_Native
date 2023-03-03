import { Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    androidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    containerRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    containerCol: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center"
    },
    text: {
        margin: 5,
        borderWidth: 2,
        borderColor: "black"
    },
    listImage: {
        width: Dimensions.get("window").width / 3,
        aspectRatio: "3/4",
        flex: 1,
    },
    singleImage: {
        width: Dimensions.get("window").width / 2,
        aspectRatio: "3/4",
        flex: 1,
    }
});

export default styles;