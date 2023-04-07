import { Slot } from "expo-router";
import { StyleSheet, StatusBar, View } from 'react-native';
//import { store } from '../redux/store'
//import { Provider } from 'react-redux'

export default function HomeLayout() {
  return <View style={styles.container}>
          <Slot />
          <StatusBar style="auto" />
        </View>;
}

/*  export default function HomeLayout() {
    return <Provider store={store}>
          <Slot />
      </Provider>;
  }*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});  