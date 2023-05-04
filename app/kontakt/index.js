import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, TextInput, MD3Colors, Divider, Button, Snackbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from "expo-linking"
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { sendContactForm, setEmail, setName, setText, stateChange } from '../../redux/reducers/contact';

export default function Kontakt() {

    const theme = useTheme();
    
    const dispatch = useDispatch();

    const {email, name, text, apiState} = useSelector((state) => state.contactForm);

    return <KeyboardAvoidingView keyboardVerticalOffset={90} enabled behavior="padding" style={{ flex: 1, flexDirection: 'column', justifyContent: "center", backgroundColor: theme.colors.background }}>
      <ScrollView>
            <Stack.Screen options={{ title: "Kontaktujte nás"}} />
            <View style={{margin: 10}}>
              <Text variant='headlineSmall'>Kontakt na centrálu</Text>
              <Text variant='bodySmall'>HyperHyperShop s.r.o.</Text>
              <Text variant='bodySmall'>Pokusná 365/15</Text>
              <Text variant='bodySmall'>999 00 Testov</Text>
              <Button icon="phone" onPress={() => Linking.openURL('tel:608733066')}>608 733 066</Button>
            </View>
            <Divider />
            <View style={{margin: 10}}>
              <Text variant='headlineSmall'>Kontaktní formulář</Text>
              <TextInput
                style={styles.textInput}
                label="Email"
                value={email}
                textContentType='emailAddress'
                onChangeText={text => dispatch(setEmail(text))}
              />
              <TextInput
                style={styles.textInput}
                label="Jméno a příjmení"
                value={name}
                textContentType='name'
                onChangeText={text => dispatch(setName(text))}
              />
              <TextInput
                style={[styles.textInput,{height: 100}]}
                label="Text požadavku"
                multiline={true}
                value={text}
                onChangeText={text => dispatch(setText(text))}
              />
              <Button mode="contained" icon="send" onPress={() => dispatch(sendContactForm({email: email, name: name, text: text}))}>Odeslat</Button>
            </View>
            </ScrollView>
            <Snackbar onDismiss={() => dispatch(stateChange(0))} visible={apiState == 3}>Formulář úspěšně odeslán, děkujeme za kontakt. Někdo se Vám brzy ozve!</Snackbar>
        </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 10
  }
});