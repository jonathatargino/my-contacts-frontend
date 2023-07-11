import ContactsList from "./components/ContactsList";
import ContactService from "@/services/ContactService";

export default async function Home() {
  const ascendentOrderContacts = await ContactService.getAll();
  const descendentOrderContacts = await ContactService.getAll("desc");

  return (
    <ContactsList ascendentOrderContacts={ascendentOrderContacts} descendentOrderContacts={descendentOrderContacts} />
  );
}
