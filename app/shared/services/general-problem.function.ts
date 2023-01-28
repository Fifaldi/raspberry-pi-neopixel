import { ApiResponse } from "apisauce";
import { GeneralApiProblem, IApiError } from "@shared/interfaces";
/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiResponse<IApiError | string>
): GeneralApiProblem | null | void {
  switch (response.problem) {
    case "CONNECTION_ERROR":
    case "NETWORK_ERROR":
      return {
        kind: "cannot-connect",
        temporary: true,
        url: `${response.config?.baseURL}/${response.config?.url}`,
      };
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true };
    case "SERVER_ERROR":
      return { kind: "server" };
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true };
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized", type: response.data };
        case 403:
          return { kind: "forbidden", type: response.data };
        case 406:
          return { kind: "client-error", type: response.data };
        case 404:
          return { kind: "not-found", status: response.status };
        case 409:
          return { kind: "client-error", type: response.data };
        case 422:
          return {
            kind: "unprocessable-entity",
            type: response.data,
          };
        default:
          return { kind: "rejected" };
      }
    case "CANCEL_ERROR":
      return null;
  }
}
