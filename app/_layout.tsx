import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Platform, Text, View } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import LoginScreen from "./(auth)/login";


const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

export default function RootLayout() {


  const [loaded, error] = useFonts({
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ConvexAuthProvider
      client={convex}
      storage={
        Platform.OS === "android" || Platform.OS === "ios"
          ? secureStorage
          : undefined
      }
    >
      <AuthLoading>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Loading authentication...</Text>
        </View>
      </AuthLoading>

      <Unauthenticated>
        <LoginScreen />
      </Unauthenticated>

      <Authenticated>
        <Stack>
          <Stack.Screen name="(main)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(main)/new-task" options={{ headerShown: false }} />
          <Stack.Screen 
          name="(main)/profile"
  options={{ title: "Profile", headerBackTitle: 'Back' }} 
/>
        </Stack>
      </Authenticated>
    </ConvexAuthProvider>
  );
}