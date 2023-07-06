export interface IContact {
  id: string;
  name: string;
  category_name: string;
  email: string;
  phone: string;
}

export interface IContactRequestBody {
  name: string;
  category_id: string;
  email: string;
  phone: string;
}
