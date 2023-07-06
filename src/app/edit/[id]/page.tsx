import FormHeader from "@/app/components/FormHeader";
import { ContactsForm } from "@/app/components";
import { ICategory } from "@/provider/category";
import { useFetch } from "@/hooks/useFetch";
import { IContact } from "@/provider/contact";

interface EditContactPageProps {
  params: {
    id: number;
  };
}

export default async function EditContactPage({ params: { id } }: EditContactPageProps) {
  const getCategories = useFetch<ICategory[]>({ endpoint: "categories", method: "GET" });
  const categories = await getCategories();

  const getContactById = useFetch<IContact>({ endpoint: `contacts/${id}`, method: "GET" });
  const contact = await getContactById();

  return (
    <div>
      <FormHeader title={`Editar ${contact.name}`} />
      <ContactsForm categories={categories} contact={contact} buttonLabel="Salvar alterações" />
    </div>
  );
}
