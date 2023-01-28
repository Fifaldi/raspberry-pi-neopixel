import { Factory } from "native-base";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "./selection.json";
const CustomIcon = createIconSetFromIcoMoon(
  selection,
  "Home-Manager-Icons",
  "HomeManagerIcons.ttf"
);

export default Factory(CustomIcon);
