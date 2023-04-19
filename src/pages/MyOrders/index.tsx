import { observer } from "mobx-react";
import { CabinetLayout } from "~layout/CabinetLayout";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "~hooks/use-auth-store";
import { If, AccordionItem } from "~components";

export const MyOrders = observer(() => {
  const { t } = useTranslation();
  const AuthStore = useAuthStore();
  const user = AuthStore.user;
  const customer = user.customer;

  return (
    <CabinetLayout title={t("account.orders.title")}>
      <If condition={customer.hasOrders}>
        {customer.orders.map((order, index) => (
          <div
            style={{
              marginTop: index ? "16px" : 0,
            }}
          >
            <AccordionItem key={order.id} order={order} />
          </div>
        ))}
      </If>
      <If condition={!customer.hasOrders}>
        <p>{t("account.orders.noOrders")}</p>
      </If>
    </CabinetLayout>
  );
});

export const Component = MyOrders;
Object.assign(Component, {
  displayName: "LazyMyOrders",
});
