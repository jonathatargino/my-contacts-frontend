import FormHeader from "@/app/components/FormHeader";
import { ContactsForm } from "@/app/components";
import { ICategory } from "@/provider/category";
import { useFetch } from "@/hooks/useFetch";
import { IContact } from "@/provider/contact";
import CategoryService from "@/services/CategoryService";
import ContactService from "@/services/ContactService";

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
