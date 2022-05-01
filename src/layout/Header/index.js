import { LocationPicker } from "../../components/LocationPicker";
import * as S from "./styled";
import { Logo } from "../../components/Logo";
import {Container } from "../../components/Container";
import {FlexBox} from "../../components/FlexBox";
import {CartButton} from "../../components/CartButton";
import {BurgerIcon} from "../../components/icons/BurgerIcon";


export const Header = () => {
    return (
        <S.Header>
            <Container>
                <FlexBox justifyContent={"space-between"} alignItems={"center"}>
                    <S.Left>
                        <S.Link to={"/"}>
                            <Logo/>
                        </S.Link>
                        <S.PcHeaderItem>
                            <LocationPicker/>
                        </S.PcHeaderItem>
                        <S.PcHeaderItem>
                            Контакты
                        </S.PcHeaderItem>
                        <S.PcHeaderItem>
                            Доставка и оплата
                        </S.PcHeaderItem>
                    </S.Left>
                    <S.Right>
                        <CartButton/>
                        <BurgerIcon/>
                    </S.Right>
                </FlexBox>

            </Container>
        </S.Header>
    )
}

