import { FormHeader } from "@/app/components";
import CategoriesForm from "@/app/components/CategoriesForm";
import { CategoryService } from "@/services";
import { ICategory } from "@/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params: { id } }: EditCategoryPageProps) {
  const authToken = cookies().get("authToken")?.value as string;
  let category: ICategory;

  try {
    category = await CategoryService.getById({ id, authToken });
  } catch {
    notFound();
  }

  return (
    <div className="mt-12">
      <FormHeader title={`Editar ${category.name}`} />
      <CategoriesForm category={category} />
    </div>
  );
}
