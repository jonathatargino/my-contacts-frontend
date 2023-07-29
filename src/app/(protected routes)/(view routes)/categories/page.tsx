import CategoriesList from "@/app/components/CategoriesList";
import { CategoryService } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Categorias | MyContacts",
  description: "Organize seus contatos com facilidade",
};

export default async function CategoriesPage() {
  const authToken = cookies().get("authToken")?.value as string;

  const ascendentOrderCategories = await CategoryService.getAll({ authToken });
  const descendentOrderCategories = await CategoryService.getAll({ order: "desc", authToken });

  return (
    <CategoriesList
      ascendentOrderCategories={ascendentOrderCategories}
      descendentOrderCategories={descendentOrderCategories}
    />
  );
}
