import APIError from "@/errors/APIError";

type HeaderObject = Record<string, any>;

interface Options<T> {
  requestBody?: T;
  headers?: HeaderObject;
}

interface MakeRequestOptions<T> extends Options<T> {
  method: "GET" | "POST" | "PUT" | "DELETE";
}

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get<U>(path: string, options?: Options<undefined>) {
    return this.makeRequest<undefined, U>(path, {
      method: "GET",
      headers: options?.headers,
    });
  }

  post<T, U>(path: string, options: Options<T>) {
    return this.makeRequest<T, U>(path, {
      method: "POST",
      requestBody: options.requestBody,
      headers: options.headers,
    });
  }

  put<T, U>(path: string, options: Options<T>) {
    return this.makeRequest<T, U>(path, {
      method: "PUT",
      requestBody: options.requestBody,
      headers: options.headers,
    });
  }

  delete(path: string, options?: Options<undefined>) {
    return this.makeRequest<undefined, void>(path, {
      method: "DELETE",
      headers: options?.headers,
    });
  }

  async makeRequest<T, U>(path: string, options: MakeRequestOptions<T>) {
    const headers = new Headers();

    if (options.requestBody) {
      headers.append("Content-Type", "application/json");
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([headerName, headerValue]) => {
        headers.append(headerName, headerValue);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      headers,
      body: JSON.stringify(options.requestBody),
      cache: "no-cache",
    });

    let responseBody: unknown = null;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    }

    if (!response.ok) {
      throw new APIError(response, responseBody);
    }

    return responseBody as U;
  }
}

export default HttpClient;
