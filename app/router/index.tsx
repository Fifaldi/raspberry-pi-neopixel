import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  EchoScreen,
  HomeScreen,
  ListScreen,
  LoginScreen,
  ManagerScreen,
} from "@screens/index";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Easing } from "react-native";
import {  IDevice, IHomeData } from "@shared/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootParamList = {
  echo: undefined;
  login: undefined;
  home: undefined;
  list: { type: IHomeData };
  manager: { item: IDevice; type: IHomeData };
};
export type RootStackNaviagtor = StackNavigationProp<RootParamList>;

const Stack = createSharedElementStackNavigator<RootParamList>();



const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  (async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {setIsAuthenticated(true)}
  })()
},[])

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
        {!isAuthenticated && <Stack.Screen name="login" component={LoginScreen}/>}
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
