import React, { useEffect, useState } from "react";
import { Button, Input, Text, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackNaviagtor } from "@router/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNaviagtor>();
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    setLoginError("");
  }, [loginData]);

  const blockBackNav = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", blockBackNav);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", blockBackNav);
      };
    }, [])
  );

  const fetchLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.110:80/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      if (result.token) {
        AsyncStorage.setItem("token", result.token);
        navigation.navigate("home");
      } else if (result.message) {
        throw new Error(result.message);
      }
    } catch (e) {
      setLoginError((e as any).message);
    }
  };

  return (
    <VStack
      safeArea
      flex={1}
      space={2}
      alignItems={"center"}
      justifyContent="center"
      px={4}
    >
      <Text fontSize={22}>Zaloguj się do serwera</Text>
      <VStack width={"100%"} space={2} my={4}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Login"
          placeholderTextColor={"#404040"}
          borderColor={"black"}
          borderWidth={1}
          value={loginData.login}
          onChangeText={(val) =>
            setLoginData((prev) => ({ ...prev, login: val }))
          }
        />
        <Input
          type="password"
          placeholder="Hasło"
          placeholderTextColor={"#404040"}
          borderColor={"black"}
          borderWidth={1}
          value={loginData.password}
          onChangeText={(val) =>
            setLoginData((prev) => ({ ...prev, password: val }))
          }
        />
      </VStack>
      <Button
        _text={{ color: "#000" }}
        bg="transparent"
        borderWidth={1}
        onPress={fetchLogin}
      >
        Submit
      </Button>
      {loginError && <Text>Nieprawidłowy login lub hasło</Text>}
    </VStack>
  );
};

export default LoginScreen;
