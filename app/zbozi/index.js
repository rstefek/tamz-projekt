import { BarCodeScanner } from 'expo-barcode-scanner';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default function Pobocky() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      setScannedCode(data);
    };

    return <View>
            <Text>Naskenujte kód zboží</Text>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scan} />
            <Text>Naskenovaný kód: {scannedCode}</Text>
        </View>;
}

const styles = StyleSheet.create({
    scan: {
      width: '100%',
      height: 180,
    },
});