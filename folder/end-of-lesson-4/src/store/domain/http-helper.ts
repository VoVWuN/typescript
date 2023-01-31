export abstract class HttpHelper {
    public static fetchAsJson<Response>(
      input: RequestInfo,
      init?: RequestInit
    ): Promise<Response> {
      return fetch(input, init)
        .then((response) => response.text())
        .then<Response>((responseText) => JSON.parse(responseText));
    }
  }