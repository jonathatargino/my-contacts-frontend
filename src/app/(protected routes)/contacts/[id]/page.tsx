import { ContactsForm, FormHeader } from "@/app/components";
import { CategoryService, ContactService } from "@/services";
import { IContact } from "@/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface EditContactPageProps {
  params: {
    id: string;
  };
}

export default async function EditContactPage({ params: { id } }: EditContactPageProps) {
  const authToken = cookies().get("authToken")?.value as string;

  let contact: IContact;

  try {
    contact = await ContactService.getById({ id, authToken });
  } catch {
    notFound();
  }

  const categories = await CategoryService.getAll({ authToken });

  return (
    <div className="mt-12">
      <FormHeader title={`Editar ${contact.name}`} />
      <ContactsForm categories={categories} contact={contact} buttonLabel="Salvar alterações" />
    </div>
  );
}
