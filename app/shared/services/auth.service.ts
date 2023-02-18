import { ILoginCredentials, IRgb } from "@shared/interfaces";
import { BaseApi } from "./baseApi.service";

export class AuthService extends BaseApi {
  static echo() {
    return this.get<{ status: string }>("echo");
  }
  static login({ login, password }: ILoginCredentials) {
    return this.post<ILoginCredentials>("login", {
      login,
      password,
    });
  }
}
