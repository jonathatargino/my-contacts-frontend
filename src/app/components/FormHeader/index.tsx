"use client";

import Image from "next/image";
import { arrowIcon } from "@/assets/images";
import { usePathname, useRouter } from "next/navigation";

interface FormHeaderProps {
  title: string;
}

export default function FormHeader({ title }: FormHeaderProps) {
  const router = useRouter();

  const splittedPathName = usePathname().split("/");
  const previousPathName = `/${splittedPathName[1]}`;

  function handleBackButtonClick() {
    router.push(previousPathName);
    router.refresh();
  }

  return (
    <header>
      <button onClick={handleBackButtonClick} className="mb-2 flex gap-2">
        <Image src={arrowIcon} alt="" className="-rotate-90" />
        <span className="font-bold text-primary-main">Voltar</span>
      </button>
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
    </header>
  );
}
