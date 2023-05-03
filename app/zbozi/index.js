import { BarCodeScanner } from 'expo-barcode-scanner';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, MD3Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'

export default function Zbozi() {

  const [hasPermission, setHasPermission] = useState(null);
  const [selectedGoods, setSelectedGoods] = useState({});

  const goodsList = useSelector((state) => state.goods.list);

  const theme = useTheme();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      let selected = goodsList.filter(gl => gl.code == data);
      if(selected) {
        setSelectedGoods(selected[0]);
      }
      
    };

    return <View>
            <Text variant='headlineSmall' style={{paddingVertical: 5}}>Naskenujte kód zboží</Text>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scan} />

            <Text>Naskenovaný kód: {selectedGoods.code}</Text>
            <Text>Název zboží: {selectedGoods.name}</Text>
        </View>;
}

const styles = StyleSheet.create({
    scan: {
      width: '100%',
      height: 180,
    },
});