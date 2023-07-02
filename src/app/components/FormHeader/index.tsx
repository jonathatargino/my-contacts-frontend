import Link from "next/link";
import Image from "next/image";
import { arrowIcon } from "@/assets/images";

interface FormHeaderProps {
  title: string;
}

export default function FormHeader({ title }: FormHeaderProps) {
  return (
    <header>
      <Link href="/" className="mb-2 flex gap-2">
        <Image src={arrowIcon} alt="" className="-rotate-90" />
        <span className="font-bold text-primary-main">Voltar</span>
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
    </header>
  );
}
