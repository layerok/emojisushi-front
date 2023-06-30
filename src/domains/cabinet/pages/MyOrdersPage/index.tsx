import { useTranslation } from "react-i18next";
import { If, AccordionItem } from "~components";
import { useUser } from "~hooks/use-auth";

export const MyOrdersPage = () => {
  const { t } = useTranslation();
  const { data: user } = useUser();

  const customer = user.customer;
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <If condition={!!user.customer.orders.length}>
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
      <If condition={!user.customer.orders.length}>
        <p>{t("account.orders.noOrders")}</p>
      </If>
    </div>
  );
};

export const Component = MyOrdersPage;
Object.assign(Component, {
  displayName: "LazyMyOrdersPage",
});
