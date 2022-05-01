import { LocationPicker } from "../../components/LocationPicker";
import * as S from "./styled";
import { Logo } from "../../components/Logo";
import {Container } from "../../components/Container";
import {FlexBox} from "../../components/FlexBox";
import {CartButton} from "../../components/CartButton";


export const Header = () => {
    return (
        <S.Header>
            <Container>
                <FlexBox justifyContent={"space-between"} alignItems={"center"}>
                    <S.Left>
                        <S.Link to={"/"}>
                            <Logo/>
                        </S.Link>
                        <S.HeaderItem>
                            <LocationPicker/>
                        </S.HeaderItem>
                        <S.HeaderItem>
                            Контакты
                        </S.HeaderItem>
                        <S.HeaderItem>
                            Доставка и оплата
                        </S.HeaderItem>
                    </S.Left>
                    <S.Right>
                        <CartButton/>
                    </S.Right>
                </FlexBox>

            </Container>
        </S.Header>
    )
}

