import { ContactsForm, FormHeader } from "@/app/components";
import { CategoryService, ContactService } from "@/services";
import { cookies } from "next/headers";

interface EditContactPageProps {
  params: {
    id: string;
  };
}

export default async function EditContactPage({ params: { id } }: EditContactPageProps) {
  const authToken = cookies().get("authToken")?.value as string;

  const categories = await CategoryService.getAll({ authToken });
  const contact = await ContactService.getById({ id, authToken });

  return (
    <div className="mt-12">
      <FormHeader title={`Editar ${contact.name}`} />
      <ContactsForm categories={categories} contact={contact} buttonLabel="Salvar alterações" />
    </div>
  );
}
