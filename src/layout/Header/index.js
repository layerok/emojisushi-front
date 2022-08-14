import { LocationPickerPopover } from "../../components/popovers/LocationPickerPopover";
import * as S from "./styled";
import {Container } from "../../components/Container";
import {FlexBox} from "../../components/FlexBox";
import {CartButton} from "../../components/CartButton";
import {TinyCartButton} from "../../components/TinyCartButton";
import {NavLink} from "../../components/NavLink";
import {ContactsModal} from "../../components/modals/ContactsModal";
import {CartModal} from "../../components/modals/CartModal";
import {MobMenuModal} from "../../components/modals/MobMenuModal";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {BurgerSvg} from "../../components/svg/BurgerSvg";
import {LogoSvg} from "../../components/svg/LogoSvg";
import {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {SvgButton} from "../../components/SvgButton";
import {UserSvg} from "../../components/svg/UserSvg";
import {AuthModal} from "../../components/modals/AuthModal";


const HeaderRaw = (
    {
        CartStore
    }
) => {

    useEffect(() => {
        CartStore.fetchItems();
    },[])


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
                            <NavLink to={"/dostavka-i-oplata"}>
                                {t('header.delivery')}
                            </NavLink>
                        </S.PcHeaderItem>
                    </S.Left>
                    <S.Right>
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

                       <S.UserBtn>
                            <AuthModal>
                                <SvgButton>
                                    <SvgIcon width={"25px"} color={"black"}>
                                        <UserSvg/>
                                    </SvgIcon>
                                </SvgButton>
                            </AuthModal>
                       </S.UserBtn>
                    </S.Right>
                </FlexBox>
            </Container>
        </S.Header>
    )
}

export const Header = inject('CartStore')(observer(HeaderRaw));

