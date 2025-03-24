import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
SplashScreen.preventAutoHideAsync();
import { persistor, store } from '@/store/index';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import COLORS from '@/config/COLORS';

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar translucent backgroundColor="transparent"  barStyle="light-content" />
        <Stack
          initialRouteName='index'
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.main },
            headerTintColor: COLORS.white,
          }}>
          <Stack.Screen name="index" options={{ title: 'Main', headerShown: false }} />
          <Stack.Screen name="details" options={{ title: 'Movie Details', headerShown: false }} />
          <Stack.Screen name="list" options={{ title: 'Movies List', headerShown: false }} />
          <Stack.Screen name="favorite" options={{ title: 'Favorite List', headerShown: false }} />
          <Stack.Screen name="actor" options={{ title: 'Favorite List', headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
