import { ContactsList } from "@/app/components";
import { ContactService } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Contatos | MyContacts",
  description: "Organize seus contatos com facilidade",
};

export default async function Home() {
  const authToken = cookies().get("authToken")?.value as string;

  const ascendentOrderContacts = await ContactService.getAll({ authToken });
  const descendentOrderContacts = await ContactService.getAll({ order: "desc", authToken });

  return (
    <ContactsList ascendentOrderContacts={ascendentOrderContacts} descendentOrderContacts={descendentOrderContacts} />
  );
}
