import { ReactElement, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { ICategory } from "~api/types";
import { CategoriesStore } from "~stores/categories.store";

export const PublishedCategories = ({
  children,
  categories: passedCategories,
}: {
  children: ({
    categories,
  }: {
    categories: ICategory[];
  }) => ReactNode | ReactNode;
  categories: ICategory[];
}) => {
  const { spotSlug } = useParams();

  const categoriesStore = new CategoriesStore(passedCategories);
  const publishedCategories = categoriesStore.getPublishedItems(spotSlug);
  return (
    <>
      {typeof children === "function"
        ? children({ categories: publishedCategories })
        : children}
    </>
  );
};
