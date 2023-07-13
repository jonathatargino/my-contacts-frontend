import { FormHeader } from "@/app/components";
import CategoriesForm from "@/app/components/CategoriesForm";

export default function AddCategoryPage() {
  return (
    <div className="mt-12">
      <FormHeader title="Nova categoria" />
      <CategoriesForm />
    </div>
  );
}
