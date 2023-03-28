import { defer, Outlet } from "react-router-dom";
import { AuthStore } from "~stores";

export const CheckUser = () => {
  return <Outlet />;
};

export const loader = () => {
  const user = AuthStore.fetchUser().catch((e) => {
    // 406 simply means that user is not authorzied, no need to throw error in this case
    if (![406].includes(e?.response.status)) {
      throw e;
    }
  });

  return defer({
    user,
  });
};

export const Component = CheckUser;

Object.assign(Component, {
  displayName: "LazyCheckUser",
});
