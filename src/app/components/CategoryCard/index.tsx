import Link from "next/link";
import Image from "next/image";
import { pencilIcon, trashIcon } from "@/assets/images";
import { ICategory } from "@/types";

interface CategoryCardProps {
  id: string;
  onTrashIconClick: ({ id, name }: ICategory) => void;
}

export default function CategoryCard({ id, onTrashIconClick }: CategoryCardProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-soft">
      <strong>Instagram</strong>
      <div className="flex gap-2">
        <Link href={`/edit/${id}`}>
          <Image src={pencilIcon} alt="Editar contato" />
        </Link>

        <button>
          <Image src={trashIcon} alt="Deletar contato" onClick={() => onTrashIconClick} />
        </button>
      </div>
    </div>
  );
}
