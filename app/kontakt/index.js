import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, TextInput, MD3Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'

export default function Kontakt() {

    const theme = useTheme();

    const storeList = useSelector((state) => state.stores.list);

    const [text, setText] = useState("");

    return <View style={{ backgroundColor: theme.colors.background }}>
            <Stack.Screen options={{ title: "Kontaktujte nás" }} />
            <Text variant='headlineSmall'>Kontakt na centrálu</Text>
            <Text variant='headlineSmall'>Kontaktní formulář</Text>
            <TextInput
              label="Email"
              value={text}
              onChangeText={text => setText(text)}
            />
        </View>;
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 300,
    },
});