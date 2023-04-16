import * as S from "./styled";
import { CartButton } from "~components/CartButton";
import { TinyCartButton } from "~components/TinyCartButton";
import { CartModal } from "~components/modals/CartModal";
import { MobMenuModal } from "~components/modals/MobMenuModal";
import { SvgIcon } from "~components/SvgIcon";
import { BurgerSvg } from "~components/svg/BurgerSvg";
import { SvgButton } from "~components/SvgButton";
import { UserSvg } from "~components/svg/UserSvg";
import { AuthModal } from "~components/modals/AuthModal";
import { LanguageSelector } from "~components/LanguageSelector";
import { stores } from "~stores/stores";
import { useNavigate } from "react-router-dom";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import Skeleton from "react-loading-skeleton";
import { useCart } from "~hooks/use-cart";

export const Right = ({ loading = false }: { loading?: boolean }) => {
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();

  const cart = useCart();
  const navigate = useNavigate();
  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector loading={loading} />
      </S.LanguageSelectorContainer>

      <CartModal>
        <S.CartBtn>
          <CartButton
            loading={loading}
            count={cart?.totalQuantity || 0}
            total={cart?.total || 0}
          />
        </S.CartBtn>
      </CartModal>

      <CartModal>
        <S.TinyCartBtn>
          <TinyCartButton loading={loading} price={cart?.total || 0} />
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
