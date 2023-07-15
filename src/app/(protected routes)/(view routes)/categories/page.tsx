import CategoriesList from "@/app/components/CategoriesList";
import { CategoryService } from "@/services";

export default async function CategoriesPage() {
  const ascendentOrderCategories = await CategoryService.getAll();
  const descendentOrderCategories = await CategoryService.getAll("desc");

  return (
    <CategoriesList
      ascendentOrderCategories={ascendentOrderCategories}
      descendentOrderCategories={descendentOrderCategories}
    />
  );
}
