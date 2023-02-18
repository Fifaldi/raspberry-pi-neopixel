import { create, ApiResponse } from "apisauce";
import { AxiosRequestConfig } from "axios";
import { IBaseModel } from "@shared/interfaces";
import { getGeneralApiProblem } from "./general-problem.function";
import * as Network from "expo-network";

const api = create({
  baseURL: "",
  headers: { Accept: "application/json" },
});
export abstract class BaseApi {
  /**
   * Send HTTP GET request, returns typed result or standard {@link IApiError}
   * @param url
   * @param config
   * @param baseUrl
   * @protected
   */
  protected static async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<T | undefined> {
    try {
      const _api = await this.createApi(baseUrl);
      const response: ApiResponse<any> = await _api.get<T>(
        url,
        config?.params,
        config
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) throw problem;
      }

      return response.data;
    } catch (e: any) {
      __DEV__ && console.log(e.message || e.kind);
      throw e;
    }
  }

  /**
   * Send HTTP POST request, returns typed result or standard {@link IApiError}
   * @param url
   * @param data
   * @param config
   * @param baseUrl
   * @protected
   */

  protected static async post<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<T | undefined> {
    try {
      const _api = await this.createApi(baseUrl);
      const response: ApiResponse<any> = await _api.post<T>(url, data, config);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) throw problem;
      }

      return response.data;
    } catch (e: any) {
      __DEV__ && console.log(e.message || e.kind);
      throw e;
    }
  }

  /**
   * Send HTTP PUT request, returns typed result or standard {@link IApiError}
   * @param url
   * @param data
   * @param config
   * @param baseUrl
   * @protected
   */

  protected static async put<T extends IBaseModel | IBaseModel[] = never>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<T | undefined> {
    try {
      const _api = await this.createApi(baseUrl);
      const response: ApiResponse<any> = await _api.put<T>(url, data, config);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) throw problem;
      }

      return response.data;
    } catch (e: any) {
      __DEV__ && console.log(e.message || e.kind);
      throw e;
    }
  }

  /**
   * Send HTTP PATCH request, returns typed result or standard {@link IApiError}
   * @param url
   * @param data
   * @param config
   * @param baseUrl
   * @protected
   */

  protected static async patch<T extends IBaseModel | IBaseModel[] = never>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<T | undefined> {
    try {
      const _api = await this.createApi(baseUrl);
      const response: ApiResponse<any> = await _api.patch<T>(url, data, config);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) throw problem;
      }

      return response.data;
    } catch (e: any) {
      __DEV__ && console.log(e.message || e.kind);
      throw e;
    }
  }

  /**
   * Send HTTP DELETE request, returns typed result or standard {@link IApiError}
   * @param url
   * @param config
   * @param baseUrl
   * @protected
   */

  protected static async delete<T extends IBaseModel | IBaseModel[] = never>(
    url: string,
    config?: AxiosRequestConfig,
    baseUrl?: string
  ): Promise<T | undefined> {
    try {
      const _api = await this.createApi(baseUrl);
      const response: ApiResponse<any> = await _api.delete<T>(
        url,
        config?.params,
        config
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) throw problem;
      }

      return response.data;
    } catch (e: any) {
      __DEV__ && console.log(e.message || e.kind);
      throw e;
    }
  }
  private static async createApi(baseUrl?: string) {
    // const ip = await Network.getIpAddressAsync();
    const ip = "192.168.0.110:80";
    api.setBaseURL(baseUrl ?? ip);
    return api;
  }
}
