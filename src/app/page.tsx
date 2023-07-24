"use client";

import { googleLogo, onlineManagementIcon } from "@/assets/images";
import Image from "next/image";
import { Button } from "./components";
import { useSearchParams, useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const authTokenInSearchParams = searchParams.get("authToken");
  const router = useRouter();

  function handleGoogleButtonClick() {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, "_self");
  }

  useEffect(() => {
    const authTokenInCookies = getCookie("authToken");
    if (authTokenInCookies) {
      return router.push("/contacts");
    }

    if (authTokenInSearchParams) {
      setCookie("authToken", authTokenInSearchParams, { maxAge: 24 * 60 * 60 * 100 });
      return router.push("/contacts");
    }
  }, []);

  return (
    <div className="mt-6 flex flex-col items-center">
      <Image src={onlineManagementIcon} alt="Pessoa gerenciando seus contatos online" width={240} height={240} />
      <div className="mb-12 mt-6 max-w-xs">
        <h1 className="mb-2 text-center text-2xl font-bold text-primary-main">Bem vindo ao MyContacts</h1>
        <h2 className="text-center">Organize seus contatos de forma rápida e prática através de categorias</h2>
      </div>
      <Button
        onClick={handleGoogleButtonClick}
        className="flex items-center gap-4 bg-white text-[#0000008a] hover:border hover:border-[#4285F4] hover:bg-white active:bg-[#EEE]"
      >
        <Image src={googleLogo} alt="google" />
        Fazer login com Google
      </Button>
    </div>
  );
}
