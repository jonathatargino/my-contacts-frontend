import CategoriesList from "@/app/components/CategoriesList";
import { CategoryService } from "@/services";
import { cookies } from "next/headers";

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
