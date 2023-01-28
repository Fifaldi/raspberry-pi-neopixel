import React, { useRef, useState } from "react";
import { VStack } from "native-base";
import { Brightness, LightColor, OnOffLight } from "@components/light";
import { ScreenHeader, CustomIcon } from "@components/shared";
import { RootParamList } from "@router/index";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { useEffect } from "react";
import { NetworkInfo } from "react-native-network-info";
import { LightService } from "@shared/services";

type ManagerScreenProps = StackScreenProps<RootParamList, "manager">;

const ManagerScreen: React.FC<ManagerScreenProps> = ({ route, navigation }) => {
  const [lightOn, setLightOn] = useState(false);
  const [lightValue, setLightValue] = useState(50);
  const [color, setColor] = useState<string>("#FFF01F");

  const { item, type } = route.params;

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   LightService.toggleLight(lightOn ? "lighton" : "lightoff");
  // }, [lightOn]);

  useEffect(() => {
    LightService.setColor({ red: 100, green: 100, blue: 100 });
  }, [lightOn]);

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

  return (
    <LinearGradient colors={["#EEB68C", "#E27D4E"]} style={{ flex: 1 }}>
      <VStack safeArea space={10} flex={1}>
        <ScreenHeader
          screenName={item.name}
          onGoBack={() => {
            animation(0).start(navigation.goBack);
          }}
        />
        <VStack space={4} alignItems={"center"} w={"100%"}>
          <SharedElement id={type.id}>
            <CustomIcon
              opacity={lightValue / 100 + 0.1}
              name={type.icon}
              fontSize={150}
              color={lightOn ? color : "black.600"}
            />
          </SharedElement>
          <Animated.View
            style={{
              opacity: mountedAnimated,
              transform: [{ translateY }],
            }}
          >
            <VStack space={4}>
              <OnOffLight
                lightOn={lightOn}
                setLightOn={() => setLightOn((prev) => !prev)}
              />
              <Brightness
                lightOn={lightOn}
                lightValue={lightValue}
                setLightValue={(val: number) => setLightValue(val)}
              />
              <LightColor
                lightOn={lightOn}
                setColor={(val: string) => setColor(val)}
              />
            </VStack>
          </Animated.View>
        </VStack>
      </VStack>
    </LinearGradient>
  );
};

export default ManagerScreen;
