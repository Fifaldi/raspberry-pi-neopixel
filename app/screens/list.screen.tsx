import React, { useRef, useState } from "react";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import { ScreenHeader, CustomIcon } from "@components/shared";
import { RootParamList } from "@router/index";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { useEffect } from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { IDevice, IHomeData } from "@shared/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";

type ListScreenProps = StackScreenProps<RootParamList, "list">;

const ListScreen: React.FC<ListScreenProps> = ({ route, navigation }) => {
  const { type } = route.params;

  const mountedAnimated = useRef(new Animated.Value(0)).current;

  const animation = (toValue: number, delay?: number) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 300,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([animation(1, 100)]).start();
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 1],
  });

  const handleItemPress = ({
    item,
    type,
  }: {
    item: IDevice;
    type: IHomeData;
  }) =>
    navigation.navigate("manager", {
      item,
      type,
    });

  const [devices, setDevices] = useState<IDevice[]>([]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://192.168.0.110:80/devices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.devices) {
        setDevices(
          result.devices.filter((device: IDevice) => device.type === type.type)
        );
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: IDevice }) => {
    return (
      <Pressable
        my={2}
        shadow={5}
        _pressed={{ opacity: 0.5 }}
        onPress={() =>
          handleItemPress({
            item,
            type,
          })
        }
      >
        <Text fontSize={24} fontWeight={"bold"}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={["#EEB68C", "#E27D4E"]} style={{ flex: 1 }}>
      <VStack safeArea space={10} flex={1}>
        <ScreenHeader
          screenName={type.name}
          onGoBack={() => {
            animation(0).start(navigation.goBack);
          }}
        />
        <VStack space={4} alignItems={"center"} w={"100%"}>
          <SharedElement id={type.id}>
            <CustomIcon name={type.icon} fontSize={40} />
          </SharedElement>
          <Animated.View
            style={{
              opacity: mountedAnimated,
              transform: [{ translateY }],
            }}
          >
            <VStack
              h={"90%"}
              justifyContent={"space-between"}
              px={4}
              pt={8}
              space={4}
              w={widthPercentageToDP(100)}
            >
              <FlatList
                ListFooterComponent={
                  <Pressable
                    my={2}
                    _pressed={{ opacity: 0.5 }}
                    onPress={() =>
                      handleItemPress({
                        type,
                        item: {
                          name: "Wszystkie komponenty oświetlenia",
                          id: "",
                          type: type.type,
                          endpoint: "all",
                          device: {
                            last_stored_rgb_value: {
                              red: 255,
                              green: 255,
                              blue: 255,
                            },
                            status: 0,
                          },
                        },
                      })
                    }
                  >
                    <HStack
                      p={2}
                      alignItems="center"
                      justifyContent={"center"}
                      borderWidth={1}
                      rounded={"sm"}
                    >
                      <Text>Steruj wszystkimi urządzeniami naraz</Text>
                    </HStack>
                  </Pressable>
                }
                ListHeaderComponent={
                  <Text fontWeight={"bold"} fontSize={16}>
                    Lista dostępnych urządzeń
                  </Text>
                }
                data={devices}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </VStack>
          </Animated.View>
        </VStack>
      </VStack>
    </LinearGradient>
  );
};

export default ListScreen;
