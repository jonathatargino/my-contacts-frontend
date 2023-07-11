import { ContactsForm } from "../components";
import FormHeader from "@/app/components/FormHeader";
import CategoryService from "@/services/CategoryService";

export default async function AddContactPage() {
  const categories = await CategoryService.getAll();

  return (
    <div>
      <FormHeader title="Novo contato" />
      <ContactsForm categories={categories} buttonLabel="Cadastrar" />
    </div>
  );
}
