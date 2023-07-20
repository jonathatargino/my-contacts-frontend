"use client";

import { ICategory } from "@/types";
import CategoryCard from "../CategoryCard";
import List from "../List";

interface CategoriesListProps {
  ascendentOrderCategories: Array<ICategory>;
  descendentOrderCategories: Array<ICategory>;
}

export default function CategoriesList({ ascendentOrderCategories, descendentOrderCategories }: CategoriesListProps) {
  return (
    <List
      Card={CategoryCard}
      ascendentOrderItems={ascendentOrderCategories}
      descendentOrderItems={descendentOrderCategories}
      CardListStyles="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2"
    />
  );
}
