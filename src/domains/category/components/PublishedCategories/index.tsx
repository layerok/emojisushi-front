import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { ICategory } from "~api/types";
import { getFromLocalStorage } from "~utils/ls.utils";

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
  const publishedCategories = passedCategories.filter((category) => {
    return (
      category.published &&
      !category.hide_categories_in_spot.find(
        (s) => s.slug === getFromLocalStorage("selectedSpotSlug")
      )
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
