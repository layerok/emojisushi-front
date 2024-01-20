import * as S from "./styled";
import { BurgerSvg, UserSvg } from "~components/svg";
import {
  SvgButton,
  LanguageSelector,
  SvgIcon,
  CartButton,
  TinyCartButton,
} from "~components";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ICity, IGetCartRes, IUser } from "~api/types";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";

type RightProps = {
  loading?: boolean;
  cities?: ICity[];
  cart?: IGetCartRes;
  user?: IUser;
};

export const Right = ({ loading = false, cart, user, cities }: RightProps) => {
  const navigate = useNavigate();
  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector loading={loading} />
      </S.LanguageSelectorContainer>

      {cart && (
        <S.CartBtn
          onClick={() => {
            NiceModal.show(ModalIDEnum.CartModal);
          }}
        >
          <CartButton
            loading={loading}
            count={cart?.totalQuantity}
            total={cart?.total}
          />
        </S.CartBtn>
      )}

      {cart && (
        <S.TinyCartBtn
          onClick={() => {
            NiceModal.show(ModalIDEnum.CartModal);
          }}
        >
          <TinyCartButton loading={loading} price={cart?.total} />
        </S.TinyCartBtn>
      )}

      <S.BurgerBtn>
        {loading ? (
          <Skeleton width={32} height={32} />
        ) : (
          <SvgIcon
            onClick={() => {
              NiceModal.show(ModalIDEnum.MobMenuModal);
            }}
            width={"32px"}
            color={"white"}
          >
            <BurgerSvg />
          </SvgIcon>
        )}
      </S.BurgerBtn>

      {user ? (
        loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <S.UserBtn
            onClick={() => {
              navigate("/account/profile");
            }}
          >
            <SvgButton>
              <SvgIcon clickable={true} width={"25px"} color={"black"}>
                <UserSvg />
              </SvgIcon>
            </SvgButton>
          </S.UserBtn>
        )
      ) : (
        <S.UserBtn>
          {loading ? (
            <Skeleton width={40} height={40} borderRadius={10} />
          ) : (
            <SvgButton
              onClick={() => {
                NiceModal.show(ModalIDEnum.AuthModal);
              }}
            >
              <SvgIcon clickable={true} width={"25px"} color={"black"}>
                <UserSvg />
              </SvgIcon>
            </SvgButton>
          )}
        </S.UserBtn>
      )}
    </S.Right>
  );
};
