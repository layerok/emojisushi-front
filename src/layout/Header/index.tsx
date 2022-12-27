import { LocationPickerPopover } from "~components/popovers/LocationPickerPopover";
import * as S from "./styled";
import {Container } from "~components/Container";
import {FlexBox} from "~components/FlexBox";
import {CartButton} from "~components/CartButton";
import {TinyCartButton} from "~components/TinyCartButton";
import {NavLinkUnderline} from "../../components/NavLinkUnderline";
import {ContactsModal} from "../../components/modals/ContactsModal";
import {CartModal} from "~components/modals/CartModal";
import {MobMenuModal} from "../../components/modals/MobMenuModal";
import {SvgIcon} from "~components/svg/SvgIcon";
import {BurgerSvg} from "~components/svg/BurgerSvg";
import {LogoSvg} from "~components/svg/LogoSvg";
import {useEffect} from "react";
import { observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {SvgButton} from "~components/SvgButton";
import {UserSvg} from "~components/svg/UserSvg";
import {AuthModal} from "~components/modals/AuthModal";
import {LanguageSelector} from "../../components/LanguageSelector";
import {stores} from "~stores/stores";
import {useNavigate} from "react-router-dom";
import {useCartStore} from "~hooks/use-cart-store";


const HeaderRaw = (

) => {
    const CartStore = useCartStore();

    useEffect(() => {
        CartStore.fetchItems();
    },[])

    const navigate = useNavigate();


    const {t} = useTranslation();
    return (
        <S.Header>
            <Container>
                <FlexBox justifyContent={"space-between"} alignItems={"center"}>
                    <S.Left>
                        <S.Link to={"/"}>
                            <SvgIcon color={"#FFE600"}>
                                <LogoSvg/>
                            </SvgIcon>
                        </S.Link>
                        <S.PcHeaderItem>
                            <LocationPickerPopover offset={22}/>
                        </S.PcHeaderItem>
                        <ContactsModal>
                            <S.PcHeaderItem>
                                {t('header.contacts')}
                            </S.PcHeaderItem>
                        </ContactsModal>
                        <S.PcHeaderItem>
                            <NavLinkUnderline style={{width:"144px"}} to={"/dostavka-i-oplata"}>
                                {t('header.delivery')}
                            </NavLinkUnderline>
                        </S.PcHeaderItem>
                    </S.Left>
                    <S.Right>
                        <S.LanguageSelectorContainer>
                            <LanguageSelector/>
                        </S.LanguageSelectorContainer>
                        <CartModal>
                            <S.CartBtn>
                                <CartButton count={CartStore.totalQuantity} total={CartStore.total}/>
                            </S.CartBtn>
                        </CartModal>

                        <CartModal>
                            <S.TinyCartBtn>
                                <TinyCartButton price={CartStore.total}/>
                            </S.TinyCartBtn>
                        </CartModal>

                        <S.BurgerBtn>
                            <MobMenuModal>
                                <SvgIcon width={"32px"} color={"white"}>
                                    <BurgerSvg/>
                                </SvgIcon>
                            </MobMenuModal>
                        </S.BurgerBtn>

                        {stores.AuthStore.isAuthorized ? (
                          <S.UserBtn onClick={() => {
                              navigate('/account')
                          }}>
                              <SvgButton>
                                  <SvgIcon width={"25px"} color={"black"}>
                                      <UserSvg/>
                                  </SvgIcon>
                              </SvgButton>
                          </S.UserBtn>
                        ): (
                          <S.UserBtn>
                              <AuthModal>
                                  <SvgButton>
                                      <SvgIcon width={"25px"} color={"black"}>
                                          <UserSvg/>
                                      </SvgIcon>
                                  </SvgButton>
                              </AuthModal>
                          </S.UserBtn>
                        )}

                    </S.Right>
                </FlexBox>
            </Container>
        </S.Header>
    )
}

export const Header = observer(HeaderRaw);

