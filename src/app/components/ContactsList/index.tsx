"use client";

import { IContact } from "@/types";
import List from "../List";
import { ContactService } from "@/services";
import ContactCard from "../ContactCard";

interface ContactsListProps {
  ascendentOrderContacts: Array<IContact>;
  descendentOrderContacts: Array<IContact>;
}

export default function ContactsList({ ascendentOrderContacts, descendentOrderContacts }: ContactsListProps) {
  return (
    <List
      Card={ContactCard}
      ascendentOrderItems={ascendentOrderContacts}
      descendentOrderItems={descendentOrderContacts}
      deleteFn={ContactService.deleteById}
      CardListStyles="flex flex-col gap-4"
    />
  );
}
