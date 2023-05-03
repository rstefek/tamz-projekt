import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      return await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      return false;
    }
}

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return null;
    }
}

export {storeData, getData}