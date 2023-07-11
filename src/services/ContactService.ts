import { IContact, IContactRequestBody } from "@/provider/contact";
import HttpClient from "./utils/HttpClient";

class ContactService {
  httpClient: HttpClient;
  baseEndpoint: string;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    this.httpClient = new HttpClient(baseURL);
    this.baseEndpoint = "/contacts";
  }

  getAll(order: "asc" | "desc" = "asc") {
    return this.httpClient.get<IContact[]>(`${this.baseEndpoint}?order=${order}`);
  }

  getById(id: string) {
    return this.httpClient.get<IContact>(`${this.baseEndpoint}/${id}`);
  }

  create(body: IContactRequestBody) {
    return this.httpClient.post<IContactRequestBody, IContact>(this.baseEndpoint, {
      requestBody: body,
    });
  }

  updateById(id: string, body: IContactRequestBody) {
    return this.httpClient.put<IContactRequestBody, IContact>(`${this.baseEndpoint}/${id}`, {
      requestBody: body,
    });
  }

  deleteById(id: string) {
    return this.httpClient.delete(`${this.baseEndpoint}/${id}`);
  }
}

export default new ContactService();
