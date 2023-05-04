import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme, Text, List, Divider, MD3Colors, ActivityIndicator, Portal, Dialog, Button, Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as Linking from "expo-linking"
import { useEffect, useState } from 'react';
import { getDistanceBetweenPoints } from '../../helpers/location';
import { populateStores } from '../../redux/reducers/stores';
import { ScrollView } from 'react-native';

export default function Pobocky() {

    const theme = useTheme();

    const storeList = useSelector((state) => state.stores.list);

    const dispatch = useDispatch();

    const [selectedStore, setSelectedStore] = useState({});
    const [location, setLocation] = useState(null);
    const [visible, setVisible] = useState(false);

    const showDialog = (storeData) => {
      setSelectedStore(storeData);
      setVisible(true);
    }
    const hideDialog = () => setVisible(false);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        //načtení z API nebo ze storage
        dispatch(populateStores());
  
        //požadavek na práva k pozici
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    return <Provider theme={theme}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Stack.Screen options={{ title: "Naše pobočky" }} />
            <Text variant='headlineSmall' style={{padding: 5}}>Mapa naší pobočkové sítě:</Text>
            <MapView 
              style={styles.map}  
              initialRegion={{
                latitude: 49.7846811,
                longitude: 15.7494739,
                latitudeDelta: 3.5,
                longitudeDelta: 7.5,
              }}
              >{storeList.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                  pinColor='orange'
                />
              ))}
              {location && location.coords && <Marker
                  key={999}
                  coordinate={location.coords}
                  title='Vaše poloha'
                  pinColor='red'
                />}
              </MapView>
              {(!location || !location.coords) && <View style={{justifyContent: "center", alignItems:"center", flexDirection: "row", height: 60}}>
                <ActivityIndicator size='small' animating={true} color={MD3Colors.red800} />
                <Text variant='titleSmall' style={{marginStart: 10}}>Čekám na polohu...</Text>
              </View>}
              <Divider />
              <ScrollView>
              <List.Section>
                <List.Subheader>Pobočky {location && location.coords ? "dle vzdálenosti":""}</List.Subheader>
                {storeList.map((marker, index) => {
                  return (
                  <List.Item onPress={() => showDialog(marker)} key={index} title={marker.title + (location && location.coords ? " (" + getDistanceBetweenPoints(marker.latlng.latitude, marker.latlng.longitude, location.coords.latitude, location.coords.longitude) + " km)" : "")} left={() => <List.Icon icon="warehouse" />} />
                )})}                
              </List.Section>
              </ScrollView>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>{selectedStore.title}</Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">{selectedStore.description}</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button icon="phone" onPress={() => Linking.openURL('tel:608733066')}>Zavolat na prodejnu</Button>
                    <Button icon="cancel" onPress={hideDialog}>Zavřít</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
        </View></Provider>;
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 300,
    }
});