import React from "react";
import { VStack, Text, Box } from "native-base";
import {
  ColorPicker,
  fromHsv,
  TriangleColorPicker,
} from "react-native-color-picker";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

interface ILightColorProps {
  lightOn: boolean;
  setColor(val: string): void;
}

const LightColor: React.FC<ILightColorProps> = ({ lightOn, setColor }) => {
  return (
    <VStack
      opacity={lightOn ? 1 : 0.5}
      w="100%"
      alignItems={"center"}
      space={2}
    >
      <Text>Zarządzaj kolorem światła </Text>
      <Box
        width={widthPercentageToDP(100)}
        height={heightPercentageToDP(30)}
        position="relative"
      >
        <TriangleColorPicker
          hideControls
          hideSliders
          onColorChange={
            lightOn ? (color) => setColor(fromHsv(color)) : undefined
          }
          style={{ flex: 1 }}
        />
        <Box
          left={0}
          right={0}
          top={0}
          bottom={0}
          position="absolute"
          zIndex={lightOn ? -1 : 1}
        />
      </Box>
    </VStack>
  );
};

export default LightColor;
