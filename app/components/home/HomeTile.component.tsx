import { View, Text } from "react-native";
import React from "react";
import { CustomIcon } from "@components/shared";
import { VStack } from "native-base";
import { SharedElement } from "react-navigation-shared-element";
import { IHomeData } from "@shared/interfaces";
import { widthPercentageToDP } from "react-native-responsive-screen";

const HomeTile: React.FC<IHomeData> = ({ id, name, icon }) => {
  return (
    <VStack
      shadow={0}
      borderWidth={2}
      borderColor={"black.600"}
      borderRadius="md"
      width={widthPercentageToDP(43)}
      height={widthPercentageToDP(43)}
      alignItems={"center"}
      justifyContent={"center"}
      m={2}
      space={4}
    >
      <SharedElement id={name}>
        <Text>{name}</Text>
      </SharedElement>
      {icon && (
        <SharedElement id={id}>
          <CustomIcon name={icon} fontSize={40} color="black.600" />
        </SharedElement>
      )}
    </VStack>
  );
};

export default HomeTile;
