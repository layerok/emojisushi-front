import { IGetCategoriesParams, IGetCategoriesRes } from "~api/types";
import { QueryOptions } from "@tanstack/react-query";
import { menuApi } from "~api";

export const categoriesQuery = (
  params?: IGetCategoriesParams
): QueryOptions<IGetCategoriesRes> => ({
  queryKey: ["categories", "list", params ?? "all"],
  queryFn: () => menuApi.getCategories(params).then((res) => res.data),
});
