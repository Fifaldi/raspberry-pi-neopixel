import * as Font from "expo-font";

export const initFonts = async () => {
  await Font.loadAsync({
    "Poppins-Light": require("./Poppins/Poppins_Light_300.ttf"),
    "Poppins-Regular": require("./Poppins/Poppins_Regular_400.ttf"),
    "Poppins-Italic": require("./Poppins/Poppins_Italic_400.ttf"),
    "Poppins-SemiBold": require("./Poppins/Poppins_Semi_Bold_600.ttf"),
    "Poppins-Bold": require("./Poppins/Poppins_Bold_700.ttf"),
    "Home-Manager-Icons": require("./HomeManagerIcons.ttf"),
  });
};
