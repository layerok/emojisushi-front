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
import {useEffect} from "react";
import {inject, observer} from "mobx-react";


const HeaderRaw = (
    {
        CartStore
    }
) => {

    useEffect(() => {
        CartStore.fetchItems();
    },[])



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
                                Контакты
                            </S.PcHeaderItem>
                        </ContactsModal>
                        <S.PcHeaderItem>
                            <NavLink to={"/dostavka-i-oplata"}>
                                Доставка и оплата
                            </NavLink>
                        </S.PcHeaderItem>
                    </S.Left>
                    <S.Right>
                        <CartModal total={CartStore.total} products={CartStore.items}>
                            <S.CartBtn>
                                <CartButton count={CartStore.totalQuantity} total={CartStore.total}/>
                            </S.CartBtn>
                        </CartModal>

                        <CartModal total={CartStore.total} products={CartStore.items}>
                            <S.TinyCartBtn>
                                <TinyCartButton/>
                            </S.TinyCartBtn>
                        </CartModal>

                        <S.BurgerBtn>
                            <MobMenuModal>
                                <SvgIcon width={"32px"} color={"white"}>
                                    <BurgerSvg/>
                                </SvgIcon>
                            </MobMenuModal>
                        </S.BurgerBtn>
                    </S.Right>
                </FlexBox>
            </Container>
        </S.Header>
    )
}

export const Header = inject('CartStore')(observer(HeaderRaw));

