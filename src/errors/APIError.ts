export default class APIError extends Error {
  response: Response;
  responseBody: any;

  constructor(response: Response, responseBody?: any) {
    super();

    this.name = "APIError";
    this.response = response;
    this.responseBody = responseBody;
    this.message = responseBody?.error || `${response.status} - ${response.statusText}`;
  }
}
