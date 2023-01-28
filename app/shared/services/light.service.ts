import { IRgb } from "@shared/interfaces";
import { BaseApi } from "./baseApi.service";

export class LightService extends BaseApi {
  static toggleLight(action: "lighton" | "lightoff") {
    return this.get(`${action}?`);
  }
  static setColor({ red, green, blue }: IRgb) {
    return this.get(`color?red=${red}&green=${green}&blue=${blue}`);
  }
}
