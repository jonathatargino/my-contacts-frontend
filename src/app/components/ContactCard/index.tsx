"use client";

import Link from "next/link";
import Image from "next/image";

import { pencilIcon, trashIcon } from "@/assets/images";
import { IContact } from "@/types";
import { formatPhone } from "@/utils";
import { usePathname } from "next/navigation";

interface ContactCardProps {
  data: IContact;
  onTrashIconClick: (contact: IContact) => void;
}

export default function ContactCard({ data, onTrashIconClick }: ContactCardProps) {
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-soft [word-wrap:break-word]">
      <div className="max-w-[80%]">
        <div>
          <strong>{data.name}</strong>
          {data.category_name ? (
            <span className="ml-2 rounded bg-primary-lighter p-1 text-xs font-bold uppercase text-primary-main">
              {data.category_name}
            </span>
          ) : null}
        </div>

        {data.email ? <span className="block text-gray-200">{data.email}</span> : null}
        {data.phone ? <span className="block text-gray-200">{formatPhone(data.phone)}</span> : null}
      </div>

      <div className="flex gap-2">
        <Link href={`${pathName}/${data.id}`}>
          <Image src={pencilIcon} alt="Editar contato" />
        </Link>

        <button>
          <Image src={trashIcon} alt="Deletar contato" onClick={() => onTrashIconClick(data)} />
        </button>
      </div>
    </div>
  );
}
