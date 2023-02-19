import { ILoginCredentials, IRgb } from "@shared/interfaces";
import { BaseApi } from "./baseApi.service";

export class AuthService extends BaseApi {
  static echo() {
    return this.get<{ status: string }>('192.168.0.110:80' );
  }
  static login({ login, password }: ILoginCredentials) {
    return this.post<ILoginCredentials>("login", {
      login,
      password,
    });
  }
}
