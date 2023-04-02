import { LocationPickerPopover } from "~components/popovers/LocationPickerPopover";
import * as S from "./styled";
import { Container } from "~components/Container";
import { FlexBox } from "~components/FlexBox";
import { CartButton } from "~components/CartButton";
import { TinyCartButton } from "~components/TinyCartButton";
import { NavLinkUnderline } from "~components/NavLinkUnderline";
import { ContactsModal } from "~components/modals/ContactsModal";
import { CartModal } from "~components/modals/CartModal";
import { MobMenuModal } from "~components/modals/MobMenuModal";
import { SvgIcon } from "~components/svg/SvgIcon";
import { BurgerSvg } from "~components/svg/BurgerSvg";
import { useTranslation } from "react-i18next";
import { SvgButton } from "~components/SvgButton";
import { UserSvg } from "~components/svg/UserSvg";
import { AuthModal } from "~components/modals/AuthModal";
import { LanguageSelector } from "~components/LanguageSelector";
import { stores } from "~stores/stores";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import { loader as checkUserLoader } from "~components/CheckUser";
import Skeleton from "react-loading-skeleton";
import { Logo } from "./components/Logo";
import { useCart } from "~hooks/use-cart";

export const Header = ({
  showSkeleton = false,
}: {
  showSkeleton?: boolean;
}) => {
  return (
    <S.Header>
      <Container>
        <FlexBox justifyContent={"space-between"} alignItems={"center"}>
          <Left showSkeleton={showSkeleton} />
          <Right showSkeleton={showSkeleton} />
        </FlexBox>
      </Container>
    </S.Header>
  );
};

const Left = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();
  const { t } = useTranslation();

  return (
    <S.Left>
      <Logo showSkeleton={showSkeleton} />
      <S.PcHeaderItem>
        <LocationPickerPopover offset={22} />
      </S.PcHeaderItem>
      <S.PcHeaderItem>
        {showSkeleton ? (
          <Skeleton width={71} height={17.25} />
        ) : (
          <ContactsModal>
            <div>{t("header.contacts")}</div>
          </ContactsModal>
        )}
      </S.PcHeaderItem>

      <S.PcHeaderItem>
        {showSkeleton ? (
          <Skeleton width={144} height={17.25} />
        ) : (
          <NavLinkUnderline
            style={{ width: "144px" }}
            to={"/" + [lang, citySlug, spotSlug, "dostavka-i-oplata"].join("/")}
          >
            {t("header.delivery")}
          </NavLinkUnderline>
        )}
      </S.PcHeaderItem>
    </S.Left>
  );
};

const Right = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();

  const cart = useCart();
  const navigate = useNavigate();
  const { user } = useRouteLoaderData("checkUser") as any;
  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector showSkeleton={showSkeleton} />
      </S.LanguageSelectorContainer>

      <CartModal>
        <S.CartBtn>
          <CartButton
            showSkeleton={showSkeleton}
            count={cart?.totalQuantity || 0}
            total={cart?.total || 0}
          />
        </S.CartBtn>
      </CartModal>

      <CartModal>
        <S.TinyCartBtn>
          <TinyCartButton
            showSkeleton={showSkeleton}
            price={cart?.total || 0}
          />
        </S.TinyCartBtn>
      </CartModal>

      <S.BurgerBtn>
        {showSkeleton ? (
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
        showSkeleton ? (
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
          {showSkeleton ? (
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
