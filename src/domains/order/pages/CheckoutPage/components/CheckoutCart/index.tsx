import * as S from "./styled";
import { CartProduct } from "~models";
import { CartModal, EditCartButton } from "~components";
import { IGetCartRes } from "~api/types";
import { CheckoutCartItem } from "./components/CheckoutCartItem";
import Skeleton from "react-loading-skeleton";
import { dummyCartProduct } from "~domains/order/mocks";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";

type CheckoutCartProps = {
  cart?: IGetCartRes;
  loading?: boolean;
};

export const CheckoutCart = ({ cart, loading = false }: CheckoutCartProps) => {
  const items = loading
    ? [new CartProduct(dummyCartProduct), new CartProduct(dummyCartProduct)]
    : (cart?.data || []).map((json) => new CartProduct(json));

  return (
    <S.Wrapper>
      <S.Items>
        {items.map((item: CartProduct, index) => {
          return (
            <CheckoutCartItem
              key={loading ? index : item.id}
              loading={loading}
              item={item}
            />
          );
        })}
      </S.Items>

      {cart && (
        <S.EditButton
          onClick={() => {
            NiceModal.show(ModalIDEnum.CartModal);
          }}
        >
          {loading ? <Skeleton /> : <EditCartButton />}
        </S.EditButton>
      )}
    </S.Wrapper>
  );
};
