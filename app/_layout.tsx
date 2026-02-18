import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useRef } from "react";
import { initDatabase } from "../services/database";
import { sincronizarItens } from "../services/syncService";
import { useColorScheme } from "@/hooks/use-color-scheme";
import NetInfo from "@react-native-community/netinfo";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const syncingRef = useRef(false);

  useEffect(() => {
    initDatabase();
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && !syncingRef.current) {
        syncingRef.current = true;

        sincronizarItens().finally(() => {
          syncingRef.current = false;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
