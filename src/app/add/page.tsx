import { useFetch } from "@/hooks/useFetch";
import { ContactsForm } from "../components";
import FormHeader from "@/app/components/FormHeader";
import { ICategory } from "@/provider/category";

export default async function AddContactPage() {
  const sendHttpRequest = useFetch<ICategory[]>({ endpoint: "categories", method: "GET" });
  const categories = await sendHttpRequest();

  return (
    <div>
      <FormHeader title="Novo contato" />
      <ContactsForm categories={categories} buttonLabel="Cadastrar" />
    </div>
  );
}
