import Cookies from "js-cookie";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authApi } from "~api";
import { IGetCitiesResponse } from "~api/access.api.types";
import { citiesQuery } from "~queries/cities.query";
import { queryClient } from "~query-client";

export const requireUser = async () => {
  const token = Cookies.get("jwt");
  if (!token) {
    throw redirect("/");
  }
  try {
    return await authApi.fetchUser().then((res) => res.data);
  } catch (e) {
    // 406 simply means that user is not authorzied, no need to throw error in this case
    if (![406].includes(e?.response.status)) {
      throw e;
    }
    throw redirect("/");
  }
};
