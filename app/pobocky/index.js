import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme, Text } from 'react-native-paper';

export default function Pobocky() {
    const theme = useTheme();
    return <View style={{ backgroundColor: theme.colors.background }}>
            <Text variant='headlineSmall'>Mapa naší pobočkové sítě:</Text>
           <MapView 
            style={styles.map}  
            initialRegion={{
              latitude: 49.7846811,
              longitude: 15.7494739,
              latitudeDelta: 3.5,
              longitudeDelta: 7.5,
            }}/>
        </View>;
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 300,
    },
});