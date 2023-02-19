import { Text, Switch } from "native-base";
import React from "react";
import { VStack } from "native-base";
interface IOnOffLightProps {
  lightOn: boolean;
  setLightOn(): void;
}

const OnOffLight: React.FC<IOnOffLightProps> = ({ lightOn, setLightOn }) => {
  return (
    <VStack alignItems={"center"} space={2}>
      <Text>{lightOn ? "Wyłącz światło" : "Włącz światło"} </Text>
      <Switch
        isChecked={lightOn}
        colorScheme={"black"}
        value={lightOn}
        onChange={setLightOn}
      />
    </VStack>
  );
};

export default OnOffLight;
