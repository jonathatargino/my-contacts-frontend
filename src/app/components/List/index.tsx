"use client";

import useToast from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Modal from "../Modal";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { arrowIcon, emptyBoxIcon, magnifierQuestionIcon } from "@/assets/images";
import { CategoryService, ContactService } from "@/services";
import { getCookie } from "cookies-next";

interface ListProps {
  descendentOrderItems: Array<any>;
  ascendentOrderItems: Array<any>;
  Card: React.FC<{ data: any; onTrashIconClick: (item: any) => void }>;
  CardListStyles: string;
}

export default function List({ Card, ascendentOrderItems, descendentOrderItems, CardListStyles }: ListProps) {
  const authToken = getCookie("authToken") as string;

  const [isInDescendentOrder, setDescendentOrder] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [itemBeingDeleted, setItemBeingDeleted] = useState<any>(null);

  const router = useRouter();
  const pathName = usePathname();

  const items = isInDescendentOrder ? descendentOrderItems : ascendentOrderItems;
  const isItemListNotEmpty = items.length > 0;

  const filteredItems = useMemo(
    () => items.filter((items) => items.name.toUpperCase().includes(searchInputValue.toUpperCase())),
    [searchInputValue, items],
  );

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (pathName === "/contacts") {
        return ContactService.deleteById({
          id: itemBeingDeleted?.id as string,
          authToken,
        });
      }

      return CategoryService.deleteById({
        id: itemBeingDeleted?.id as string,
        authToken,
      });
    },
    onSuccess: () => {
      setIsDeleteModalVisible(false);
      setItemBeingDeleted(null);
      useToast({
        type: "success",
        text: pathName === "/contacts" ? "Sucesso ao deletar um contato" : "Sucesso ao deletar uma categoria",
      });
      router.refresh();
    },
    onError: () => {
      setIsDeleteModalVisible(false);
      setItemBeingDeleted(null);
      useToast({
        type: "danger",
        text: pathName === "/contacts" ? "Erro ao deletar um usuário" : "Erro ao deletar uma categoria",
      });
    },
  });

  function toggleDescendentOrder() {
    setDescendentOrder((prevState) => !prevState);
  }

  function handleTrashIconClick(item: any) {
    setItemBeingDeleted(item);
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
              Tem certeza que deseja remover {pathName === "/contacts" ? "o contato" : "a categoria"} &quot;
              {itemBeingDeleted?.name}&quot; ?
            </Modal.Title>
            <Modal.Description>Esta ação não poderá ser desfeita!</Modal.Description>
            <Modal.Actions>
              <Modal.Action
                className="bg-transparent text-gray-200 hover:bg-transparent active:bg-transparent disabled:bg-transparent"
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
        {isItemListNotEmpty ? (
          <input
            className="h-[50px] w-full rounded-3xl bg-white p-4 shadow-soft placeholder:text-gray-200"
            placeholder={pathName === "/contacts" ? "Pesquise um contato..." : "Pesquise uma categoria..."}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        ) : null}

        <header
          className={twMerge(
            classNames("flex items-center justify-between border-b-2 border-gray-200 border-opacity-20 pb-4", {
              "justify-center": !isItemListNotEmpty,
            }),
          )}
        >
          {isItemListNotEmpty ? (
            <strong className="text-2xl">
              {filteredItems.length}{" "}
              {pathName === "/contacts"
                ? filteredItems.length === 1
                  ? "contato"
                  : "contatos"
                : filteredItems.length === 1
                ? "categoria"
                : "categorias"}
            </strong>
          ) : null}

          <Link
            href={`${pathName}/add`}
            className="rounded border-2 border-primary-main px-4 py-3 font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white"
          >
            {pathName === "/contacts" ? "Novo contato" : "Nova categoria"}
          </Link>
        </header>
      </div>

      {filteredItems.length === 0 && items.length > 0 ? (
        <div className="flex items-start gap-6">
          <Image src={magnifierQuestionIcon} alt="" />
          <p className="text-gray-200 [word-break:break-word]">
            Nenhum resultado foi encontrado para
            <strong className="text-gray-400"> &quot;{searchInputValue}&quot;</strong>
          </p>
        </div>
      ) : null}

      <div>
        {filteredItems.length > 0 ? (
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
        {isItemListNotEmpty ? (
          <div className={CardListStyles}>
            {filteredItems.map((item) => (
              <Card key={item.id} data={item} onTrashIconClick={handleTrashIconClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src={emptyBoxIcon} alt="caixa vazia" />
            <p className="text-center text-gray-200">
              Você ainda não tem{" "}
              {pathName === "/contacts" ? "nenhum contato cadastrado" : "nenhuma categoria cadastrada"}! Clique no botão
              <strong className="text-primary-main">
                &quot;{pathName === "/contacts" ? "Novo contato" : "Nova categoria"}&quot;
              </strong>
              acima para cadastrar {pathName === "/contacts" ? "o seu primeiro" : "a sua primeira"}!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
