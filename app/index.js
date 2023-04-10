import { Link, Stack } from 'expo-router';
import { Button, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const theme = useTheme();

    return <View style={{ backgroundColor: theme.colors.background }}>
            <Stack.Screen options={{ title: "Aplikace HyperHyperShop" }} />
            <Link href="/pobocky" asChild>
                <Button mode="outlined">Pobočky</Button>
            </Link>
            <Link href="/zbozi" asChild>
                <Button mode="outlined">Zboží</Button>
            </Link>
        </View>;
}
