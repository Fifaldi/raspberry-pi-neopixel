import React from "react";
import { Slider, VStack } from "native-base";
import { Text } from "native-base";

interface IBrightnessProps {
  lightOn: boolean;
  lightValue: number;
  setLightValue(value: number): void;
}

const Brightness: React.FC<IBrightnessProps> = ({
  lightOn,
  lightValue,
  setLightValue,
}) => {
  return (
    <VStack
      opacity={lightOn ? 1 : 0.5}
      w="100%"
      alignItems={"center"}
      space={2}
    >
      <Text>Zarządzaj natężeniem światła </Text>
      <Slider
        isDisabled={!lightOn}
        colorScheme="black"
        w="3/4"
        maxW="300"
        defaultValue={lightValue}
        value={lightValue}
        onChange={setLightValue}
        minValue={0}
        maxValue={100}
        step={0.1}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </VStack>
  );
};

export default Brightness;
