import { FlexBox } from "~components/FlexBox";
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutCart } from "./components/CheckoutCart";
import { Heading } from "~components/Heading";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "~hooks/use-cart-store";
import { CartStore, PaymentStore, ShippingStore } from "~stores";

export const Checkout = observer(() => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const CartStore = useCartStore();

  useEffect(() => {
    if (CartStore.items.length === 0) {
      navigate("/");
    }
  }, [CartStore.items]);
  const { t } = useTranslation();
  return (
    <>
      <Heading>{t("checkout.title")}</Heading>
      <FlexBox
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        style={{ marginTop: "30px" }}
      >
        <CheckoutForm />
        <CheckoutCart />
      </FlexBox>
    </>
  );
});

export const Component = Checkout;
Object.assign(Component, {
  displayName: "LazyCheckout",
});

export const loader = async () => {
  await PaymentStore.fetchItems();
  await ShippingStore.fetchItems();
  await CartStore.fetchItems();
  return true;
};

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return (
    currentParams.spotSlug !== nextParams.spotSlug ||
    currentParams.citySlug !== nextParams.citySlug
  );
};
