import React from "react";
import { HStack, Text, Pressable, Box } from "native-base";
import CustomIcon from "./CustomIcon.component";
import { SharedElement } from "react-navigation-shared-element";

interface IScreenHeaderProps {
  screenName: string;
  onGoBack(): void;
}

const ScreenHeader: React.FC<IScreenHeaderProps> = ({
  screenName,
  onGoBack,
}) => {
  return (
    <HStack
      px={6}
      alignItems={"center"}
      justifyContent={"space-between"}
      space={4}
    >
      <Pressable
        flex={1}
        _pressed={{ opacity: 0.5 }}
        onPress={() => {
          onGoBack();
        }}
      >
        <CustomIcon name="arrow-left" fontSize={"2xl"} />
      </Pressable>
      <SharedElement id={screenName}>
        <Text
          textAlign={"center"}
          flexGrow={1}
          fontSize={"2xl"}
          fontWeight="bold"
        >
          {screenName}
        </Text>
      </SharedElement>
      <Box flex={1} />
    </HStack>
  );
};

export default ScreenHeader;
