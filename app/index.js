import { Link, Stack } from 'expo-router';
import { Button, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Index() {
    const theme = useTheme();

    return <View style={{ backgroundColor: theme.colors.background, padding: 10 }}>
            <Stack.Screen options={{ title: "Aplikace HyperHyperShop" }} />
            <Image source={require('../assets/market_building.png')} style={{width:'100%', height: 120}} resizeMode='contain'/>
            <Link href="/pobocky" asChild>
                <Button mode="outlined" style={{marginVertical: 10}}>Pobočky</Button>
            </Link>
            <Link href="/zbozi" asChild>
                <Button mode="outlined" style={{marginVertical: 10}}>Zboží</Button>
            </Link>
        </View>;
}
