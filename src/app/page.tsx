"use client";

import { IContact } from "@/provider/contact";
import { useFetch } from "@/hooks/useFetch";

import ContactsList from "./components/ContactsList";

export default async function Home() {
  const getContacts = useFetch<IContact[]>({ endpoint: "contacts", method: "GET" });
  const contacts = await getContacts();

  const getDescendentOrderContacts = useFetch<IContact[]>({ endpoint: "contacts?order=desc", method: "GET" });
  const descendentOrderContacts = await getDescendentOrderContacts();

  return <ContactsList contacts={contacts} descendentOrderContacts={descendentOrderContacts} />;
}
