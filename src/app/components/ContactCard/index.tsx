"use client";

import Link from "next/link";
import Image from "next/image";

import { pencilIcon, trashIcon } from "@/assets/images";
import { IContact } from "@/types";
import { formatPhone } from "@/utils";

interface ContactCardProps {
  contact: IContact;
  onTrashIconClick: (contact: IContact) => void;
}

export default function ContactCard({ contact, onTrashIconClick }: ContactCardProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-soft">
      <div>
        <div>
          <strong>{contact.name}</strong>
          <span className="ml-2 rounded bg-primary-lighter p-1 text-xs font-bold uppercase text-primary-main">
            {contact.category_name}
          </span>
        </div>

        <span className="block text-gray-200">{contact.email}</span>
        <span className="block text-gray-200">{formatPhone(contact.phone)}</span>
      </div>

      <div className="flex gap-2">
        <Link href={`/edit/${contact.id}`}>
          <Image src={pencilIcon} alt="Editar contato" />
        </Link>

        <button>
          <Image src={trashIcon} alt="Deletar contato" onClick={() => onTrashIconClick(contact)} />
        </button>
      </div>
    </div>
  );
}
