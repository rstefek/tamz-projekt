import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme, Text, List, Divider, Chip, MD3Colors, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { getDistanceBetweenPoints } from '../../helpers/location';
import { populateStores } from '../../redux/reducers/stores';

export default function Pobocky() {

    const theme = useTheme();

    const storeList = useSelector((state) => state.stores.list);

    const dispatch = useDispatch();

    const [location, setLocation] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        console.log("populate");
        dispatch(populateStores());
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    return <View style={{ backgroundColor: theme.colors.background }}>
            <Stack.Screen options={{ title: "Naše pobočky" }} />
            <Text variant='headlineSmall'>Mapa naší pobočkové sítě:</Text>
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
              <Divider />
              <List.Section>
                <List.Subheader>Pobočky {location && location.coords ? "dle vzdálenosti":""}</List.Subheader>
                {storeList.map((marker, index) => {
                  return (
                  <List.Item key={index} title={marker.title + (location && location.coords ? " (" + getDistanceBetweenPoints(marker.latlng.latitude, marker.latlng.longitude, location.coords.latitude, location.coords.longitude) + " km)" : "")} left={() => <List.Icon icon="warehouse" />} />
                )})}                
              </List.Section>
              <Divider />
              {(!location || !location.coords) && <View style={{justifyContent: "center", alignItems:"center", flexDirection: "row", height: 60}}>
                <ActivityIndicator size='small' animating={true} color={MD3Colors.red800} />
                <Text variant='titleSmall' style={{marginStart: 10}}>Čekám na polohu...</Text>
              </View>}
        </View>;
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 300,
    }
});