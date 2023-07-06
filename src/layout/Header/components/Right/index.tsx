import * as S from "./styled";
import { BurgerSvg, UserSvg } from "~components/svg";
import {
  SvgButton,
  AuthModal,
  LanguageSelector,
  MobMenuModal,
  CartModal,
  SvgIcon,
  CartButton,
  TinyCartButton,
} from "~components";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ICity, IGetCartRes, IUser } from "~api/types";

type RightProps = {
  loading?: boolean;
  cities?: ICity[];
  cart?: IGetCartRes;
  user?: IUser;
};

export const Right = ({
  loading = false,
  cities = [],
  cart,
  user,
}: RightProps) => {
  const navigate = useNavigate();
  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector loading={loading} />
      </S.LanguageSelectorContainer>

      {cart && (
        <CartModal cart={cart}>
          <S.CartBtn>
            <CartButton
              loading={loading}
              count={cart?.totalQuantity}
              total={cart?.total}
            />
          </S.CartBtn>
        </CartModal>
      )}

      {cart && (
        <CartModal cart={cart}>
          <S.TinyCartBtn>
            <TinyCartButton loading={loading} price={cart?.total} />
          </S.TinyCartBtn>
        </CartModal>
      )}

      <S.BurgerBtn>
        {loading ? (
          <Skeleton width={32} height={32} />
        ) : (
          <MobMenuModal cities={cities}>
            <SvgIcon width={"32px"} color={"white"}>
              <BurgerSvg />
            </SvgIcon>
          </MobMenuModal>
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
            <AuthModal redirect_to={undefined}>
              <SvgButton>
                <SvgIcon clickable={true} width={"25px"} color={"black"}>
                  <UserSvg />
                </SvgIcon>
              </SvgButton>
            </AuthModal>
          )}
        </S.UserBtn>
      )}
    </S.Right>
  );
};
