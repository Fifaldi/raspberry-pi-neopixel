export interface IHomeData {
  id: string;
  name: string;
  icon: string;
  type: string;
}

export interface IRgb {
  red: number;
  green: number;
  blue: number;
}

export interface IDeviceData {
  last_stored_rgb_value: IRgb;
    status: 1 | 0
}

export interface IDevice {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  device: IDeviceData
}