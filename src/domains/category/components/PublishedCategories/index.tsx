import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { ICategory } from "~api/types";

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

  const publishedCategories = passedCategories.filter((category) => {
    return (
      category.published &&
      !category.hide_categories_in_spot.find((s) => s.slug === spotSlug)
    );
  });

  return (
    <>
      {typeof children === "function"
        ? children({ categories: publishedCategories })
        : children}
    </>
  );
};
