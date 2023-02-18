import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  EchoScreen,
  HomeScreen,
  ListScreen,
  ManagerScreen,
} from "@screens/index";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Easing } from "react-native";
import { IComponentData, IHomeData } from "@shared/interfaces";

export type RootParamList = {
  echo: undefined;
  home: undefined;
  list: { type: IHomeData };
  manager: { item: IComponentData; type: IHomeData };
};
export type RootStackNaviagtor = StackNavigationProp<RootParamList>;

const Stack = createSharedElementStackNavigator<RootParamList>();

const Router = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "transparent" },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="echo"
      >
        <Stack.Screen name="echo" component={EchoScreen} />
        <Stack.Screen name="home" component={HomeScreen} />

        <Stack.Screen
          name="list"
          component={ListScreen}
          sharedElements={(route) => {
            const { type } = route.params;
            return [type.id, type.name];
          }}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: "timing",
                config: {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                },
              },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
        <Stack.Screen
          name="manager"
          component={ManagerScreen}
          sharedElements={(route) => {
            const { type } = route.params;
            return [type.id, type.name];
          }}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: "timing",
                config: {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                },
              },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
