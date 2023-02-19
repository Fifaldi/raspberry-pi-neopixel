import React, { useEffect, useState } from "react";
import { Spinner, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { RootStackNaviagtor } from "@router/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EchoScreen = () => {
  const navigation = useNavigation<RootStackNaviagtor>();
  const [isFetchedWithError, setIsFetchedWithError] = useState(false);

  const fetchEcho = async () => {
    let isAuthenticated = false;
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isAuthenticated = true;
    }
    try {
      await fetch("http://192.168.0.110:80/echo");
      navigation.navigate(isAuthenticated ? "home" : "login");
    } catch (e) {
      setIsFetchedWithError(true);
    }
  };
  useEffect(() => {
    fetchEcho();
  }, []);

  return (
    <VStack
      safeArea
      flex={1}
      space={2}
      alignItems={"center"}
      justifyContent="center"
    >
      {!isFetchedWithError ? (
        <VStack>
          <Spinner size={"lg"} color="#000" />
          <Text fontSize={"lg"}>Łączenie z serwerem</Text>
        </VStack>
      ) : (
        <Text fontSize={"lg"}>
          Nie można się połączyć z sewerem. Spróbuj ponownie później
        </Text>
      )}
    </VStack>
  );
};

export default EchoScreen;
