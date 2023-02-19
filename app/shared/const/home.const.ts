import { IHomeData } from "@shared/interfaces";
import faker from "faker";

export const HOME_DATA: IHomeData[] = [
  {
    id: faker.datatype.uuid(),
    name: "Oświetlenie",
    icon: "lightbulb",
    type: 'light'
  },
  {
    id: faker.datatype.uuid(),
    name: "Ogrzewanie",
    icon: "heating",
    type: 'heating',

  },
  {
    id: faker.datatype.uuid(),
    name: "Wideofon",
    icon: "tablet",
    type: 'communication',

  },
  {
    id: faker.datatype.uuid(),
    name: "Kamery",
    icon: "security-camera",
    type: 'camera',

  },
  {
    id: faker.datatype.uuid(),
    name: "Rolety",
    icon: "roller-blinds",
    type: 'blinds',

  },
  {
    id: faker.datatype.uuid(),
    name: "Klimatyzacja",
    icon: "air-conditioner",
    type: 'air-condition',

  },
];
