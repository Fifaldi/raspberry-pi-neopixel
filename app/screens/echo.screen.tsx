import React, { useEffect, useState } from "react";
import { Spinner, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { RootStackNaviagtor } from "@router/index";
import { AuthService } from "@shared/services/auth.service";

const EchoScreen = () => {
  const navigation = useNavigation<RootStackNaviagtor>();
  const [isFetchedWithError, setIsFetchedWithError] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await AuthService.echo();
        if (response?.status === "ok") {
          navigation.navigate("home");
        }
        console.log("====> response", response);
      } catch (e) {
        console.log("====>, e", e);
        setIsFetchedWithError(true);
      }
    };
    fetch();
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
          <Text fontSize={"lg"}>Connecting to server</Text>
        </VStack>
      ) : (
        <Text fontSize={"lg"}>Cannot connect to server</Text>
      )}
    </VStack>
  );
};

export default EchoScreen;
