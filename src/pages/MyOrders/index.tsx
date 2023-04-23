import { CabinetLayout } from "~layout/CabinetLayout";
import { useTranslation } from "react-i18next";
import { If, AccordionItem } from "~components";
import { useLoaderData } from "react-router-dom";
import { User } from "~models";
import { requireUser } from "~utils/loader.utils";

export const MyOrders = () => {
  const { t } = useTranslation();
  const { user: userJson } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const user = new User(userJson);
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
};

export const Component = MyOrders;
Object.assign(Component, {
  displayName: "LazyMyOrders",
});

export const loader = async () => {
  const user = await requireUser();

  return {
    user,
  };
};
