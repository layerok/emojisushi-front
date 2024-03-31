import * as S from "./styled";
import { CartProduct } from "~models";
import { SkeletonWrap, SvgIcon } from "~components";
import { UIButton } from "~common/ui-components/UIButton/UIButton";
import { IGetCartRes } from "~api/types";
import { CheckoutCartItem } from "./components/CheckoutCartItem";
import { dummyCartProduct } from "~domains/order/mocks";
import { ModalIDEnum } from "~common/modal.constants";
import { PencilSvg } from "~components/svg/PencilSvg";
import { useTranslation } from "react-i18next";
import { useShowModal } from "~modal";

type CheckoutCartProps = {
  cart?: IGetCartRes;
  loading?: boolean;
};

export const CheckoutCart = ({ cart, loading = false }: CheckoutCartProps) => {
  const { t } = useTranslation();
  const items = loading
    ? [new CartProduct(dummyCartProduct), new CartProduct(dummyCartProduct)]
    : (cart?.data || []).map((json) => new CartProduct(json));

  const showModal = useShowModal();

  return (
    <S.Wrapper>
      <S.Inner>
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

        <S.EditButton>
          <SkeletonWrap loading={loading}>
            <UIButton
              onClick={() => {
                showModal(ModalIDEnum.CartModal);
              }}
              text={t("editBtn.edit_order")}
            >
              <SvgIcon color={"white"} width={"25px"}>
                <PencilSvg />
              </SvgIcon>
            </UIButton>
          </SkeletonWrap>
        </S.EditButton>
      </S.Inner>
    </S.Wrapper>
  );
};
