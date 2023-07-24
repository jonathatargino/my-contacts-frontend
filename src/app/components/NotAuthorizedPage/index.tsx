"use client";

import { prohibitedIcon } from "@/assets/images";
import Image from "next/image";
import { Button } from "@/app/components";
import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="flex flex-col items-center">
      <Image className="my-16" src={prohibitedIcon} alt="Carinha triste" width={160} height={160} />
      <h1 className="text-2xl font-bold text-danger-main">Acesso não autorizado</h1>
      <p>Você precisa estar cadastrado para acessar esta página.</p>
      <Link className="mt-12" href="/">
        <Button>Ir para página de Login</Button>
      </Link>
    </div>
  );
}
