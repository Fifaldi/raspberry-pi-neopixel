import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNaviagtor } from "@router/index";
import { FlatList, Text, Pressable, VStack } from "native-base";
import { IDevice, IHomeData } from "@shared/interfaces";
import { HOME_DATA } from "@shared/const";
import HomeTile from "@components/home/HomeTile.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNaviagtor>();
  const [devices, setDevices] = useState<IDevice[]>([]);
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

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://192.168.0.110:80/devices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.devices) {
        setDevices(result.devices);
      }
    })();
  }, []);

  const handleItemPress = (type: IHomeData) =>
    navigation.navigate("list", {
      type,
    });

  return (
    <VStack safeArea flex={1} space={2}>
      <Text textAlign={"center"} fontSize={"2xl"} fontWeight="bold">
        Home Manager
      </Text>
      <Text textAlign={"center"} fontSize={"md"}>
        Wszystkie smart rzeczy w jednej aplikacji
      </Text>
      <FlatList
        keyExtractor={({ id }) => id}
        bounces={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={HOME_DATA}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            _disabled={{ opacity: 0.5 }}
            isDisabled={!devices.some((el: IDevice) => el.type === item.type)}
            _pressed={{ opacity: 0.5 }}
            onPress={() => handleItemPress(item)}
          >
            <HomeTile {...item} />
          </Pressable>
        )}
      />
    </VStack>
  );
};

export default HomeScreen;
