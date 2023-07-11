import { ContactsList } from "@/app/components";
import { ContactService } from "@/services";

export default async function Home() {
  const ascendentOrderContacts = await ContactService.getAll();
  const descendentOrderContacts = await ContactService.getAll("desc");

  return (
    <ContactsList ascendentOrderContacts={ascendentOrderContacts} descendentOrderContacts={descendentOrderContacts} />
  );
}
