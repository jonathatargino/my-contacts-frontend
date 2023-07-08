import APIError from "@/errors/APIError";

interface UseFetchProps {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export function useFetch<T>({ endpoint, method }: UseFetchProps): <U>(requestBody?: U) => Promise<T> {
  const sendHttpRequest = async <U>(requestBody?: U) => {
    const headers = new Headers();

    if (requestBody) {
      headers.append("Content-Type", "application/json");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      headers,
      body: requestBody ? JSON.stringify(requestBody) : null,
      method,
      cache: "no-cache",
    });

    let responseBody: any;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    }

    if (!response.ok) {
      throw new APIError(response, responseBody);
    }

    return responseBody as T;
  };

  return sendHttpRequest;
}
