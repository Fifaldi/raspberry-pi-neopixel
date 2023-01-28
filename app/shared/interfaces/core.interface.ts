export interface IBaseModel<T = string> {
  id: T;
}
export interface IApiError {
  code: string;
  details: string;
}

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | {
      kind: "cannot-connect";
      temporary: true;
      message?: string;
      title?: string;
      url?: string;
    }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; type: string | undefined | IApiError }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; type: string | undefined | IApiError }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; status: number }
  /**
   * Unable to process provided data.  This is a 422.
   */
  | {
      kind: "unprocessable-entity";
      message?: string;
      title?: string;
      type: any;
    }
  /**
   * Response 406
   */
  | { kind: "client-error"; type: string | undefined | IApiError }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data" };
