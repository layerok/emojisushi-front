import * as S from "./styled";
import {Logo} from "../../components/Logo";
import {Container} from "../../components/Container";

export const Footer = () => {
    return (
        <S.Footer>
            <Container>
                <S.Left>
                    <S.Logo>
                        <Logo/>
                    </S.Logo>
                    <S.List>
                        list...
                    </S.List>
                </S.Left>
                <S.Right>

                </S.Right>
            </Container>
        </S.Footer>
    )
}