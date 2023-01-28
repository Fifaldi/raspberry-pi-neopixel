import React, { useRef } from "react";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import { ScreenHeader, CustomIcon } from "@components/shared";
import { RootParamList } from "@router/index";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { useEffect } from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { IComponentData, IHomeData } from "@shared/interfaces";

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
    item: IComponentData;
    type: IHomeData;
  }) =>
    navigation.navigate("manager", {
      item,
      type,
    });

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
              <Pressable
                shadow={5}
                _pressed={{ opacity: 0.5 }}
                onPress={() =>
                  handleItemPress({
                    item: { id: "1", name: "WS2812 NeoPixel" },
                    type,
                  })
                }
              >
                <Text fontSize={24} fontWeight={"bold"}>
                  WS2812 NeoPixel
                </Text>
              </Pressable>
              <Pressable _pressed={{ opacity: 0.5 }}>
                <HStack
                  p={2}
                  space={2}
                  alignItems="center"
                  borderWidth={1}
                  rounded={"sm"}
                >
                  <CustomIcon name={"add-new"} fontSize={40} />
                  <Text>Dodaj nowe urządzenie</Text>
                </HStack>
              </Pressable>
            </VStack>
          </Animated.View>
        </VStack>
      </VStack>
    </LinearGradient>
  );
};

export default ListScreen;
