import { ICategory, ICategoryRequestBody } from "@/types";
import HttpClient from "./utils/HttpClient";

class CategoryService {
  httpClient: HttpClient;
  baseEndpoint: string;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    this.httpClient = new HttpClient(baseURL);
    this.baseEndpoint = "/categories";
  }

  getAll(order: "asc" | "desc" = "asc") {
    return this.httpClient.get<ICategory[]>(`${this.baseEndpoint}?order=${order}`);
  }

  getById(id: string) {
    return this.httpClient.get<ICategory>(`${this.baseEndpoint}/${id}`);
  }

  create(body: ICategoryRequestBody) {
    return this.httpClient.post<ICategoryRequestBody, ICategory>(this.baseEndpoint, {
      requestBody: body,
    });
  }

  updateById(id: string, body: ICategoryRequestBody) {
    return this.httpClient.put<ICategoryRequestBody, ICategory>(`${this.baseEndpoint}/${id}`, { requestBody: body });
  }

  deleteById(id: string) {
    return this.httpClient.delete(`${this.baseEndpoint}/${id}`);
  }
}

export default new CategoryService();
