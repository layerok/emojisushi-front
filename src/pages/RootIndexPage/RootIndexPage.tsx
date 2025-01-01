import { Navigate, useLoaderData } from "react-router-dom";
import { ROUTES } from "~routes";
import { queryClient } from "~lib/query-client";
import { IGetCatalogRes } from "@layerok/emojisushi-js-sdk";
import { catalogQuery } from "~domains/catalog/catalog.query";

const RootIndexPage = () => {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <Navigate
      to={ROUTES.CATEGORY.SHOW.buildPath({
        categorySlug: loaderData.categories[0].slug,
      })}
    />
  );
};

export const Component = RootIndexPage;

export const loader = async () => {
  return (
    queryClient.getQueryData<IGetCatalogRes>(catalogQuery.queryKey) ??
    (await queryClient.fetchQuery<IGetCatalogRes>(catalogQuery))
  );
};
