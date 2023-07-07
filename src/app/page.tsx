import { IContact } from "@/provider/contact";
import { useFetch } from "@/hooks/useFetch";

import ContactsList from "./components/ContactsList";

export default async function Home() {
  const getAscendentOrderContacts = useFetch<IContact[]>({ endpoint: "contacts", method: "GET" });
  const ascendentOrderContacts = await getAscendentOrderContacts();

  const getDescendentOrderContacts = useFetch<IContact[]>({ endpoint: "contacts?order=desc", method: "GET" });
  const descendentOrderContacts = await getDescendentOrderContacts();

  return (
    <ContactsList ascendentOrderContacts={ascendentOrderContacts} descendentOrderContacts={descendentOrderContacts} />
  );
}
