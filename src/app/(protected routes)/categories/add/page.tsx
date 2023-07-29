import { FormHeader } from "@/app/components";
import CategoriesForm from "@/app/components/CategoriesForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova categoria | MyContacts",
  description: "Organize seus contatos com facilidade",
};

export default function AddCategoryPage() {
  return (
    <div className="mt-12">
      <FormHeader title="Nova categoria" />
      <CategoriesForm />
    </div>
  );
}
