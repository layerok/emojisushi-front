import { Outlet } from "react-router-dom";
import { AuthStore } from "~stores";

export const CheckUser = () => {
  return <Outlet />;
};

export const loader = async () => {
  try {
    await AuthStore.fetchUser();
  } catch (e: any) {
    // 406 simply means that user is not authorzied, no need to throw error in this case
    if (![406].includes(e?.response.status)) {
      throw e;
    }
  }
  return true;
};

export const Component = CheckUser;

Object.assign(Component, {
  displayName: "LazyCheckUser",
});
