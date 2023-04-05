import { IGetCategoriesParams } from "~api/menu.api.types";
import { QueryOptions } from "react-query";
import MenuApi from "~api/menu.api";

export const categoriesQuery = (
  params?: IGetCategoriesParams
): QueryOptions => ({
  queryKey: ["categories", "list", params ?? "all"],
  queryFn: () => MenuApi.getCategories(params).then((res) => res.data),
});
