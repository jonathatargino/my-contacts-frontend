"use client";

import Link from "next/link";
import Image from "next/image";
import { pencilIcon, trashIcon } from "@/assets/images";
import { ICategory } from "@/types";
import { usePathname } from "next/navigation";

interface CategoryCardProps {
  data: ICategory;
  onTrashIconClick: ({ id, name }: ICategory) => void;
}

export default function CategoryCard({ data, onTrashIconClick }: CategoryCardProps) {
  const pathName = usePathname();

  return (
    <div className="flex justify-between bg-white p-4 shadow-soft [word-wrap:break-word] marker:items-center">
      <strong className="max-w-[80%]">{data.name}</strong>
      <div className="flex gap-2">
        <Link href={`${pathName}/${data.id}`}>
          <Image src={pencilIcon} alt="Editar contato" />
        </Link>

        <button onClick={() => onTrashIconClick(data)}>
          <Image src={trashIcon} alt="Deletar contato" />
        </button>
      </div>
    </div>
  );
}
