import { ContactsForm } from "../components";
import FormHeader from "@/app/components/FormHeader";

export default function AddContactPage() {
  return (
    <div>
      <FormHeader title="Novo contato" />
      <ContactsForm buttonLabel="Cadastrar" />
    </div>
  );
}
