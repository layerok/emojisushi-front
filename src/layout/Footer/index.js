import * as S from "./styled";
import {Logo} from "../../components/Logo";
import {Container} from "../../components/Container";

export const Footer = () => {
    return (
        <S.Footer>
            <Container>
                <Logo/>
            </Container>
        </S.Footer>
    )
}