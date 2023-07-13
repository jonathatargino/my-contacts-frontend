"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";

import { arrowIcon, emptyBoxIcon, magnifierQuestionIcon } from "@/assets/images";
import { ContactCard, Modal } from "@/app/components";
import { ContactService } from "@/services";
import { IContact } from "@/types";
import useToast from "@/hooks/useToast";

interface ContactsListProps {
  ascendentOrderContacts: Array<IContact>;
  descendentOrderContacts: Array<IContact>;
}

export default function ContactsList({ ascendentOrderContacts, descendentOrderContacts }: ContactsListProps) {
  const [isInDescendentOrder, setDescendentOrder] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<IContact | null>(null);

  const router = useRouter();

  const contacts = isInDescendentOrder ? descendentOrderContacts : ascendentOrderContacts;
  const isContactListNotEmpty = contacts.length > 0;

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name.toUpperCase().includes(searchInputValue.toUpperCase())),
    [searchInputValue, contacts],
  );

  const deleteMutation = useMutation({
    mutationFn: () => ContactService.deleteById(contactBeingDeleted?.id as string),
    onSuccess: () => {
      setIsDeleteModalVisible(false);
      setContactBeingDeleted(null);
      useToast({ type: "success", text: "Sucesso ao deletar um usuário" });
      router.refresh();
    },
    onError: () => {
      setIsDeleteModalVisible(false);
      setContactBeingDeleted(null);
      useToast({ type: "danger", text: "Erro ao deletar um usuário" });
    },
  });

  function toggleDescendentOrder() {
    setDescendentOrder((prevState) => !prevState);
  }

  function handleTrashIconClick(contact: IContact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleDelete() {
    deleteMutation.mutate();
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  return (
    <>
      <Modal.Root visible={isDeleteModalVisible}>
        <Modal.Body>
          <Modal.Content>
            <Modal.Title className="text-danger-main">
              Tem certeza que deseja remover o contato &quot;{contactBeingDeleted?.name}&quot; ?
            </Modal.Title>
            <Modal.Description>Esta ação não poderá ser desfeita!</Modal.Description>
            <Modal.Actions>
              <Modal.Action
                className="bg-transparent text-gray-200 disabled:bg-transparent"
                onClick={handleCloseDeleteModal}
                disabled={deleteMutation.isLoading}
              >
                Cancelar
              </Modal.Action>
              <Modal.Action
                className="bg-danger-main font-bold text-white hover:bg-danger-light active:bg-danger-dark"
                onClick={handleDelete}
                isLoading={deleteMutation.isLoading}
              >
                Deletar
              </Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal.Body>
      </Modal.Root>
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

      {filteredContacts.length === 0 && contacts.length > 0 ? (
        <div className="flex items-start gap-6">
          <Image src={magnifierQuestionIcon} alt="" />
          <p className="text-gray-200 [word-break:break-word]">
            Nenhum resultado foi encontrado para
            <strong className="text-gray-400"> &quot;{searchInputValue}&quot;</strong>
          </p>
        </div>
      ) : null}

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
              <ContactCard key={contact.id} contact={contact} onTrashIconClick={handleTrashIconClick} />
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
