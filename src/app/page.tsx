import { googleLogo, onlineManagementIcon } from "@/assets/images";
import Image from "next/image";
import { Button } from "./components";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image src={onlineManagementIcon} alt="Pessoa gerenciando seus contatos online" width={240} height={240} />
      <div className="mb-12 mt-6 max-w-xs">
        <h1 className="mb-2 text-2xl font-bold text-primary-main">Bem vindo ao MyContacts</h1>
        <h2 className="text-center">Organize seus contatos de forma rápida e prática através de categorias</h2>
      </div>
      <Button className="flex items-center gap-4 bg-white text-[#0000008a] hover:border hover:border-[#4285F4] hover:bg-white active:bg-[#EEE]">
        <Image src={googleLogo} alt="google" />
        Fazer login com Google
      </Button>
    </div>
  );
}
