"use client";

import { sadIcon } from "@/assets/images";
import Image from "next/image";
import { Button } from "./components";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center">
      <Image className="my-16" src={sadIcon} alt="Carinha triste" width={160} height={160} />
      <h1 className="text-2xl font-bold text-danger-main">Página não encontrada</h1>
      <p>A página que você está tentando acessar não existe</p>
      <Link className="mt-12" href="/">
        <Button>Voltar ao início</Button>
      </Link>
    </div>
  );
}
