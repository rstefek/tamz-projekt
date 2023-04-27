import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme, Text, List, MD3Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'

export default function Pobocky() {

    const theme = useTheme();

    const storeList = useSelector((state) => state.stores.list);

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
                />
              ))}</MapView>
              <List.Section>
                <List.Subheader>Pobočky dle vzdálenosti</List.Subheader>
                {storeList.map((marker, index) => (
                  <List.Item key={index} title={marker.title} left={() => <List.Icon icon="warehouse" />} />
                ))}                
              </List.Section>
        </View>;
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 300,
    },
});