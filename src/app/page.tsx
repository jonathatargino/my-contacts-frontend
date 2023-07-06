"use client";

import { IContact } from "@/provider/contact";
import { useFetch } from "@/hooks/useFetch";

import ContactsList from "./components/ContactsList";

export default async function Home() {
  const sendHttpRequest = useFetch<IContact[]>({ endpoint: "contacts", method: "GET" });
  const contacts = await sendHttpRequest();

  return <ContactsList contacts={contacts} />;
}
