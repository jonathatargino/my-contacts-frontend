import Link from "next/link";
import Image from "next/image";
import { arrowIcon } from "@/assets/images";
import { IContact } from "@/provider/contact";
import ContactCard from "./components/ContactCard";

const users: IContact[] = [
  {
    id: "1",
    name: "Jonatha Targino",
    category: "Instagram",
    email: "j.oliveiratargino@hotmail.com",
    phone: "(85) 99999-9999",
  },
  {
    id: "2",
    name: "Arthur Queiroz",
    category: "Linkedin",
    email: "a.queiroz@hotmail.com",
    phone: "(85) 98888-8888",
  },
  {
    id: "3",
    name: "Jorge Vitor Aguiar",
    category: "Facebook",
    email: "jv.aguiar@hotmail.com",
    phone: "(85) 97777-7777",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <input
        className="h-[50px] w-full rounded-3xl bg-white p-4 placeholder:text-gray-200"
        placeholder="Pesquise um contato..."
      />

      <div className="flex items-center justify-between">
        <strong className="text-2xl">3 contatos</strong>
        <Link
          href="/add"
          className="border-2 border-primary-main p-3 font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white"
        >
          Novo contato
        </Link>
      </div>

      <div>
        <div className="justify-left mb-2 flex items-center gap-2">
          <span className="font-bold text-primary-main">Nome</span>
          <Image src={arrowIcon} alt="Ordenar por nome"></Image>
        </div>

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <ContactCard
              key={user.id}
              id={user.id}
              email={user.email}
              category={user.category}
              name={user.name}
              phone={user.phone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
