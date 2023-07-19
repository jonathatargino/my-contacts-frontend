import { ContactsForm, FormHeader } from "@/app/components";
import { CategoryService } from "@/services";
import { cookies } from "next/headers";

export default async function AddContactPage() {
  const authToken = cookies().get("authToken")?.value as string;

  const categories = await CategoryService.getAll({ authToken });

  return (
    <div className="mt-12">
      <FormHeader title="Novo contato" />
      <ContactsForm categories={categories} buttonLabel="Cadastrar" />
    </div>
  );
}
