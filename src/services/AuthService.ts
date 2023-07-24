import HttpClient from "./utils/HttpClient";

class AuthService {
  httpClient: HttpClient;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    this.httpClient = new HttpClient(baseURL);
  }

  validateToken(authToken: string) {
    return this.httpClient.get<{ authorized: boolean }>("/auth/login/token_validation", {
      headers: { Authorization: authToken },
    });
  }

  logout() {
    return this.httpClient.get<void>("/auth/logout");
  }
}

export default new AuthService();
