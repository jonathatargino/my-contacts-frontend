"use client";

import Link from "next/link";
import { Button } from "./components";
import Image from "next/image";
import { sadIcon } from "@/assets/images";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <input
          className="h-[50px] w-full rounded-3xl bg-white p-4 shadow-soft placeholder:text-gray-200"
          placeholder="Pesquise um contato..."
        />

        <header className="flex justify-end">
          <Link
            href="/add"
            className="border-2 border-primary-main p-3 font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white"
          >
            Novo contato
          </Link>
        </header>

        <div className="flex gap-6">
          <Image src={sadIcon} alt="Carinha triste" />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold text-danger-main">Ocorreu um erro ao obter seus contatos!</span>
            <Button className="w-fit" onClick={reset}>
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
