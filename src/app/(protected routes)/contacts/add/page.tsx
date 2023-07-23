import { ContactsForm, FormHeader } from "@/app/components";
import { emptyBoxIcon } from "@/assets/images";
import { CategoryService } from "@/services";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function AddContactPage() {
  const authToken = cookies().get("authToken")?.value as string;

  const categories = await CategoryService.getAll({ authToken });

  if (categories.length === 0) {
    return (
      <>
        <header className="mt-12 flex justify-center pb-4">
          <Link
            href={"/categories/add"}
            className="rounded border-2 border-primary-main px-4 py-3 text-sm font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white sm:text-base"
          >
            Nova Categoria
          </Link>
        </header>

        <div className="flex flex-col items-center justify-center gap-2">
          <Image src={emptyBoxIcon} alt="caixa vazia" />
          <p className="text-center text-gray-200">
            É necessário possuir pelo menos uma categoria para criar contatos e você ainda não tem nenhuma categoria
            cadastrada! Clique no botão
            <strong className="text-primary-main">&quot;Nova categoria&quot;</strong>
            acima para cadastrar a sua primeira!
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="mt-12">
      <FormHeader title="Novo contato" />
      <ContactsForm categories={categories} buttonLabel="Cadastrar" />
    </div>
  );
}
