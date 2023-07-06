interface BaseProps {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export function useFetch<T>({
  endpoint,
  method,
}: BaseProps): <U>(body?: U | undefined) => Promise<T extends undefined ? undefined : T> {
  const sendHttpRequest = async <U>(body?: U) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
      method: method,
      cache: "no-cache",
    });

    const text = await response.text();

    if (!response.ok) {
      const backendErrorMessage: string = JSON.parse(text).message;
      throw new Error(backendErrorMessage ?? "Algo está errado");
    }

    const data: T extends undefined ? undefined : T = text ? await JSON.parse(text) : undefined;

    return data;
  };

  return sendHttpRequest;
}
