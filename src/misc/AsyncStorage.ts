import AsyncStorage from "@react-native-async-storage/async-storage"

    // Обращение к асинкстораджу
    export const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@storage_key")
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
            console.log(e)
        }
    }

    // Запись в асинксторадж
    export const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("@storage_key", jsonValue)
        } catch (e) {
            console.log(e)
        }
    }