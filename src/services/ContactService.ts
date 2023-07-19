import { IContact, IContactRequestBody } from "@/types";
import HttpClient from "./utils/HttpClient";

class ContactService {
  httpClient: HttpClient;
  baseEndpoint: string;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    this.httpClient = new HttpClient(baseURL);
    this.baseEndpoint = "/contacts";
  }

  getAll(params: { order?: "asc" | "desc"; authToken: string }) {
    return this.httpClient.get<IContact[]>(`${this.baseEndpoint}?order=${params.order || "asc"}`, {
      headers: { Authorization: params.authToken },
    });
  }

  getById(params: { id: string; authToken: string }) {
    return this.httpClient.get<IContact>(`${this.baseEndpoint}/${params.id}`, {
      headers: { Authorization: params.authToken },
    });
  }

  create(params: { body: IContactRequestBody; authToken: string }) {
    return this.httpClient.post<IContactRequestBody, IContact>(this.baseEndpoint, {
      requestBody: params.body,
      headers: { Authorization: params.authToken },
    });
  }

  updateById(params: { id: string; body: IContactRequestBody; authToken: string }) {
    return this.httpClient.put<IContactRequestBody, IContact>(`${this.baseEndpoint}/${params.id}`, {
      requestBody: params.body,
      headers: { Authorization: params.authToken },
    });
  }

  deleteById(params: { id: string; authToken: string }) {
    return this.httpClient.delete(`${this.baseEndpoint}/${params.id}`, {
      headers: { Authorization: params.authToken },
    });
  }
}

export default new ContactService();
