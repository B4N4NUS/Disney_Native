import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ff6600"
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
    justifyContent: "center",
    backgroundColor: "#303030"
  },
  characterContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#303030"
  },
  loginButton: {
    width: Dimensions.get("window").width * 3 / 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 2,
  },
  searchBar: {
    borderWidth:1,
    borderRadius: 3,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 3,
  },
  textInput: {
    margin: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
    maxWidth: Dimensions.get("window").width * 5 / 7,
    minWidth: Dimensions.get("window").width * 5 / 7,
  },
  listImage: {
    // margin: 10,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    borderRadius: 10,
    // width: Dimensions.get("window").width * 2 / 7,
    aspectRatio: "3/4",
    flex: 1,
    alignItems:"center"
  },
  listText: {
    textAlign: "center",
    color:"white",
    flex: 1, 
    flexWrap: "wrap", 
    marginHorizontal:10,
    height: 30,
    padding: 5,
    // justifyContent:"center",
    
  },
  listItem: {
    margin: 10,
    backgroundColor: "#3e3e3e",
    borderRadius: 10,
    width: Dimensions.get("window").width / 3,
    flex: 1,
  },
  singleImage: {
    width: Dimensions.get("window").width / 2,
    aspectRatio: "3/4",
    flex: 1,
    justifyContent:"center"
  },
  header: {
    backgroundColor: '#3e3e3e',
    // borderTopWidth:1,
    shadowColor: '#000000',
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6600',
    // marginBottom: 10,
  },
  dropdownBody: {
    backgroundColor: "#3e3e3e",
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    height:"100%"
  },
  elivatedButton: {
    // position: "absolute",
    // zIndex:100,
    margin:10,
    padding:12,
    borderRadius: 50,
    maxHeight:40,
    maxWidth:40,
    minHeight:40,
    minWidth:40,
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#ff6600"

  },
  elivation: {
    position: "absolute",
    zIndex:100,
    right:0,
    top: 0,
  },
  characterText: {
    textAlign:"center",
    color:"white",
  },
  addButton: {
    borderRadius: 50,
    borderColor: "#ff6600",
    borderWidth:1,
    height:25,
    margin:2,
    aspectRatio:"1/1",
    justifyContent: "center",
    marginRight:10,
  },
  addButtonText: {
    textAlign: "center",
    color: "#ff6600"
  },
  groupListText: {
    textAlign:"left",
    flexWrap: "wrap", 
    marginLeft: 30,
    color:"white",
    flex: 1,
  }
});

export default styles;