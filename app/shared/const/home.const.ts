import { IHomeData } from "@shared/interfaces";
import faker from "faker";

export const HOME_DATA: IHomeData[] = [
  {
    id: faker.datatype.uuid(),
    name: "Oświetlenie",
    screen: "light",
    icon: "lightbulb",
  },
  {
    id: faker.datatype.uuid(),
    name: "Ogrzewanie",
    icon: "heating",
  },
  {
    id: faker.datatype.uuid(),
    name: "Wideofon",
    icon: "tablet",
  },
  {
    id: faker.datatype.uuid(),
    name: "Kamery",
    icon: "security-camera",
  },
  {
    id: faker.datatype.uuid(),
    name: "Rolety",
    icon: "roller-blinds",
  },
  {
    id: faker.datatype.uuid(),
    name: "Klimatyzacja",
    icon: "air-conditioner",
  },
];
