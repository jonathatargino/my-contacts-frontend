"use client";

import Link from "next/link";
import Image from "next/image";
import { arrowIcon, emptyBoxIcon } from "@/assets/images";
import ContactCard from "../ContactCard";
import { IContact } from "@/provider/contact";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface ContactsListProps {
  ascendentOrderContacts: Array<IContact>;
  descendentOrderContacts: Array<IContact>;
}

export default function ContactsList({ ascendentOrderContacts, descendentOrderContacts }: ContactsListProps) {
  const [isInDescendentOrder, setDescendentOrder] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const contacts = isInDescendentOrder ? descendentOrderContacts : ascendentOrderContacts;
  const isContactListNotEmpty = contacts.length > 0;

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name.toUpperCase().includes(searchInputValue.toUpperCase())),
    [searchInputValue, contacts],
  );

  function toggleDescendentOrder() {
    setDescendentOrder((prevState) => !prevState);
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-8">
        {isContactListNotEmpty ? (
          <input
            className="h-[50px] w-full rounded-3xl bg-white p-4 shadow-soft placeholder:text-gray-200"
            placeholder="Pesquise um contato..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        ) : null}

        <header
          className={twMerge(
            classNames("flex items-center justify-between border-b-2 border-gray-200 border-opacity-20 pb-4", {
              "justify-center": !isContactListNotEmpty,
            }),
          )}
        >
          {isContactListNotEmpty ? (
            <strong className="text-2xl">
              {filteredContacts.length} {filteredContacts.length === 1 ? "contato" : "contatos"}
            </strong>
          ) : null}

          <Link
            href="/add"
            className="rounded border-2 border-primary-main px-4 py-3 font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white"
          >
            Novo contato
          </Link>
        </header>
      </div>

      <div>
        {filteredContacts.length > 0 ? (
          <header className="justify-left mb-2">
            <button className="flex items-center gap-2" onClick={() => toggleDescendentOrder()}>
              <span className="font-bold text-primary-main">Nome</span>
              <Image
                src={arrowIcon}
                alt={isInDescendentOrder ? "Ordenar crescentemente" : "Ordenar decrescentemente"}
                className={classNames("transition-all", { "rotate-180": isInDescendentOrder })}
              ></Image>
            </button>
          </header>
        ) : null}
        {isContactListNotEmpty ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={emptyBoxIcon} alt="caixa vazia" />
            <p className="text-center text-gray-200">
              Você ainda não tem nenhum contato cadastrado! Clique no botão
              <strong className="text-primary-main"> &quot;Novo contato&quot; </strong>
              acima para cadastrar o seu primeiro!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
