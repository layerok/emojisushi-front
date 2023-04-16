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
import { stores } from "~stores/stores";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import Skeleton from "react-loading-skeleton";
import { CartProduct } from "~models";
import { useOptimisticCartTotals } from "~hooks/use-layout-fetchers";

export const Right = ({ loading = false }: { loading?: boolean }) => {
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();

  const { cart } = useRouteLoaderData("layout") as any;
  const navigate = useNavigate();
  const items = (cart?.data || []).map((json) => new CartProduct(json));
  const cartTotals = useOptimisticCartTotals({ items });
  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector loading={loading} />
      </S.LanguageSelectorContainer>

      <CartModal>
        <S.CartBtn>
          <CartButton
            loading={loading}
            count={cartTotals.quantity || 0}
            total={cartTotals.price || 0}
          />
        </S.CartBtn>
      </CartModal>

      <CartModal>
        <S.TinyCartBtn>
          <TinyCartButton loading={loading} price={cartTotals.price || 0} />
        </S.TinyCartBtn>
      </CartModal>

      <S.BurgerBtn>
        {loading ? (
          <Skeleton width={32} height={32} />
        ) : (
          <MobMenuModal>
            <SvgIcon width={"32px"} color={"white"}>
              <BurgerSvg />
            </SvgIcon>
          </MobMenuModal>
        )}
      </S.BurgerBtn>

      {stores.AuthStore.isAuthorized ? (
        loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <S.UserBtn
            onClick={() => {
              navigate(
                "/" + [lang, citySlug, spotSlug, "account", "profile"].join("/")
              );
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
            <AuthModal>
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
