"use client";

import Link from "next/link";
import Image from "next/image";
import { pencilIcon, trashIcon } from "@/assets/images";
import { IContact } from "@/provider/contact";

export default function ContactCard({ id, name, category, email, phone }: IContact) {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-soft">
      <div>
        <div>
          <strong>{name}</strong>
          <span className="ml-2 rounded bg-primary-lighter p-1 text-xs font-bold uppercase text-primary-main">
            {category}
          </span>
        </div>

        <span className="block text-gray-200">{email}</span>
        <span className="block text-gray-200">{phone}</span>
      </div>

      <div className="flex gap-2">
        <Link href={`/edit/${id}`}>
          <Image src={pencilIcon} alt="Editar contato" />
        </Link>

        <button>
          <Image src={trashIcon} alt="Deletar contato" />
        </button>
      </div>
    </div>
  );
}
