import { ContactsForm, FormHeader } from "@/app/components";
import { CategoryService, ContactService } from "@/services";

interface EditContactPageProps {
  params: {
    id: string;
  };
}

export default async function EditContactPage({ params: { id } }: EditContactPageProps) {
  const categories = await CategoryService.getAll();
  const contact = await ContactService.getById(id);

  return (
    <div>
      <FormHeader title={`Editar ${contact.name}`} />
      <ContactsForm categories={categories} contact={contact} buttonLabel="Salvar alterações" />
    </div>
  );
}
