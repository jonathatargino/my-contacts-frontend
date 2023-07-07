"use client";

import Link from "next/link";
import Image from "next/image";
import { arrowIcon } from "@/assets/images";
import ContactCard from "../ContactCard";
import { IContact } from "@/provider/contact";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

interface ContactsListProps {
  ascendentOrderContacts: Array<IContact>;
  descendentOrderContacts: Array<IContact>;
}

export default function ContactsList({ ascendentOrderContacts, descendentOrderContacts }: ContactsListProps) {
  const [isInDescendentOrder, setDescendentOrder] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const contacts = useMemo(() => {
    return isInDescendentOrder ? descendentOrderContacts : ascendentOrderContacts;
  }, [isInDescendentOrder]);

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => RegExp(searchInputValue.toUpperCase()).test(contact.name.toUpperCase())),
    [searchInputValue, contacts],
  );

  const toggleDescendentOrder = useCallback(() => {
    setDescendentOrder((prevState) => !prevState);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <input
        className="h-[50px] w-full rounded-3xl bg-white p-4 shadow-soft placeholder:text-gray-200"
        placeholder="Pesquise um contato..."
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />

      <header className="flex items-center justify-between">
        <strong className="text-2xl">
          {contacts.length} {contacts.length === 1 ? "contato" : "contatos"}
        </strong>
        <Link
          href="/add"
          className="border-2 border-primary-main p-3 font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white"
        >
          Novo contato
        </Link>
      </header>

      <div>
        <header className="justify-left mb-2">
          <button className="flex items-center gap-2">
            <span className="font-bold text-primary-main" onClick={() => toggleDescendentOrder()}>
              Nome
            </span>
            <Image
              src={arrowIcon}
              alt={isInDescendentOrder ? "Ordenar crescentemente" : "Ordenar decrescentemente"}
              className={classNames("transition-all", { "rotate-180": isInDescendentOrder })}
            ></Image>
          </button>
        </header>

        <div className="flex flex-col gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              id={contact.id}
              email={contact.email}
              category_name={contact.category_name}
              name={contact.name}
              phone={contact.phone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
