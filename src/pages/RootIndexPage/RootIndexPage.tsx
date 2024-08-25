import { Navigate, useLoaderData } from "react-router-dom";
import { ROUTES } from "~routes";
import { categoriesQuery } from "~queries";
import { queryClient } from "~lib/query-client";
import { IGetCategoriesRes } from "@layerok/emojisushi-js-sdk";

const RootIndexPage = () => {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <Navigate
      to={ROUTES.CATEGORY.SHOW.buildPath({
        categorySlug: loaderData.categories.data[0].slug,
      })}
    />
  );
};

export const Component = RootIndexPage;

export const loader = async () => {
  const _categoriesQuery = categoriesQuery();

  const categories =
    queryClient.getQueryData<IGetCategoriesRes>(_categoriesQuery.queryKey) ??
    (await queryClient.fetchQuery<IGetCategoriesRes>(_categoriesQuery));

  return {
    categories,
  };
};
