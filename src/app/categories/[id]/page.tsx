import { FormHeader } from "@/app/components";
import CategoriesForm from "@/app/components/CategoriesForm";
import { CategoryService } from "@/services";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const category = await CategoryService.getById(params.id);

  return (
    <div className="mt-12">
      <FormHeader title={`Editar ${category.name}`} />
      <CategoriesForm category={category} />
    </div>
  );
}
