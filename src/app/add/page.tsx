import { ContactsForm, FormHeader } from "@/app/components";
import { CategoryService } from "@/services";

export default async function AddContactPage() {
  const categories = await CategoryService.getAll();

  return (
    <div>
      <FormHeader title="Novo contato" />
      <ContactsForm categories={categories} buttonLabel="Cadastrar" />
    </div>
  );
}
