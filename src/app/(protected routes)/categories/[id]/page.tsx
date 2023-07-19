import { FormHeader } from "@/app/components";
import CategoriesForm from "@/app/components/CategoriesForm";
import { CategoryService } from "@/services";
import { cookies } from "next/headers";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params: { id } }: EditCategoryPageProps) {
  const authToken = cookies().get("authToken")?.value as string;
  const category = await CategoryService.getById({ id, authToken });

  return (
    <div className="mt-12">
      <FormHeader title={`Editar ${category.name}`} />
      <CategoriesForm category={category} />
    </div>
  );
}
