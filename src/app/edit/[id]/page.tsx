import FormHeader from "@/app/components/FormHeader";
import { ContactsForm } from "@/app/components";

export default function EditContactPage() {
  return (
    <div>
      <FormHeader title="Editar Jonatha Targino" />
      <ContactsForm buttonLabel="Salvar alterações" />
    </div>
  );
}
