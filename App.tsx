import Router from "./app/router";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "./app/theme/theme";
import { initFonts } from "./app/theme/fonts";
import { enableScreens } from "react-native-screens";

export default function App() {
  const [initalized, setInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await initFonts();
        enableScreens();
      } catch (err) {
        console.log(err);
      } finally {
        setInitialized(true);
      }
    })();
  }, []);

  return initalized ? (
    <LinearGradient colors={["#EEB68C", "#E27D4E"]} style={styles.container}>
      <NativeBaseProvider theme={theme}>
        <StatusBar backgroundColor={"#EEB68C"} />
        <Router />
      </NativeBaseProvider>
    </LinearGradient>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    paddingTop: 4,
  },
});
