import React from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNaviagtor } from "@router/index";
import { FlatList, Text, Pressable, VStack } from "native-base";
import { IHomeData } from "@shared/interfaces";
import { HOME_DATA } from "@shared/const";
import HomeTile from "@components/home/HomeTile.component";

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNaviagtor>();
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
