import { BarCodeScanner } from 'expo-barcode-scanner';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, MD3Colors, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { populateGoods } from '../../redux/reducers/goods';

export default function Zbozi() {

  const [hasPermission, setHasPermission] = useState(null);
  const [selectedGoods, setSelectedGoods] = useState({});

  const goodsList = useSelector((state) => state.goods.list);

  const dispatch = useDispatch();

  const theme = useTheme();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    //načtení z API nebo ze storage
    dispatch(populateGoods());

    //požadavek k povolení práv ke kameře
    getBarCodeScannerPermissions();

  }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      let selected = goodsList.filter(gl => gl.code == data);
      if(selected.length > 0) {
        setSelectedGoods(selected[0]);
      }
      
    };

    return <View style={{ backgroundColor: theme.colors.background }}>
            <Stack.Screen options={{ title: "Skenování zboží" }} />
            <Text variant='headlineSmall' style={{padding: 5}}>Naskenujte kód zboží</Text>
            <Divider />
            <View style={styles.dataRow}>
            <Text>Počet položek v DB</Text>
            <Text variant='titleMedium'>{goodsList.length}</Text>
            </View>
            
            {hasPermission ?
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scan} />
            :
            <Text variant='bodyMedium'>Není povolen přístup k fotoaparátu, nelze skenovat</Text>
            }
            
            {selectedGoods.code && <>
            <View style={styles.dataRow}>
              <Text>Naskenovaný kód</Text>
              <Text variant='titleMedium'>{selectedGoods.code}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text>Název zboží</Text>
              <Text variant='titleMedium'>{selectedGoods.name}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text>Cena</Text>
              <Text variant='titleMedium'>{selectedGoods.price} Kč</Text>
            </View>
            <Divider />
            </>}

        </View>;
}

const styles = StyleSheet.create({
    scan: {
      width: '100%',
      height: 180,
    },
    dataRow: {
      flexDirection: "row", 
      justifyContent: "space-between",
      alignItems: "center",
      margin: 10
    }
});