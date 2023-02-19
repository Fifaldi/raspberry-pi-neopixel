import React, { useRef, useState } from "react";
import { Spinner, Text, VStack } from "native-base";
import { Brightness, LightColor, OnOffLight } from "@components/light";
import { ScreenHeader, CustomIcon } from "@components/shared";
import { RootParamList } from "@router/index";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";
import { IDevice, IDeviceData, IRgb } from "@shared/interfaces";
import throttle from "lodash.throttle";

type ManagerScreenProps = StackScreenProps<RootParamList, "manager">;

const ManagerScreen: React.FC<ManagerScreenProps> = ({ route, navigation }) => {
  const [fetched, setFetched] = useState(false);
  const [device, setDevice] = useState<IDeviceData>();
  const { item, type } = route.params;
  const [lightOn, setLightOn] = useState<boolean>(false);
  const [lightValue, setLightValue] = useState(0.5);
  const [color, setColor] = useState<string>("");
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      token && setToken(token);
      const response = await fetch(
        `http://192.168.0.110:80/devices/${item.endpoint}`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      const result = await response.json();
      const { red, green, blue } = result.device.last_stored_rgb_value;
      console.log(red, green, blue);
      setDevice(result.device);
      setColor(rgbHex(red, green, blue));
      setLightOn(!!result.device.status);
      setFetched(true);
    })();
  }, []);

  const handleSetColor = async (color: IRgb) => {
    await fetch(`http://192.168.0.110:80/${item.endpoint}/color`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });
  };

  const throttledSetColor = throttle(handleSetColor, 500);

  useEffect(() => {
    (async () => {
      if (fetched) {
        fetch(
          `http://192.168.0.110:80/${item.endpoint}/${
            lightOn ? "lighton" : "lightoff"
          }`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` } }
        );
      }
    })();
  }, [lightOn]);

  useEffect(() => {
    (async () => {
      if (lightOn && fetched) {
        const rgb = hexRgb(color);
        throttledSetColor(rgb);
      }
    })();
  }, [color]);
  useEffect(() => {
    (async () => {
      if (lightOn && fetched) {
        const val = hexRgb(color ?? "");
        const rgb = {
          ...val,
          red: val.red * lightValue,
          green: val.green * lightValue,
          blue: val.blue * lightValue,
        };
        throttledSetColor(rgb);
      }
    })();
  }, [lightValue]);

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

  if (!fetched)
    return (
      <LinearGradient
        colors={["#EEB68C", "#E27D4E"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Spinner color="#000" size="lg" />
      </LinearGradient>
    );
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
              opacity={lightValue + 0.1}
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
                color={color}
              />
            </VStack>
          </Animated.View>
        </VStack>
      </VStack>
    </LinearGradient>
  );
};

export default ManagerScreen;
