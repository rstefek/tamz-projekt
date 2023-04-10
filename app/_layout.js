import { Stack } from "expo-router";
import { store } from '../redux/store'
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import { Provider as StoreProvider } from 'react-redux';

const theme = {
  ...DefaultTheme
};

export default function HomeLayout() {
  return <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  </StoreProvider>;
}
