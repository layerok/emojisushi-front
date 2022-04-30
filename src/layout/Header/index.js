import { LocationPicker } from "../../components/LocationPicker";
import * as S from "./styled";
import {Logo} from "../../components/Logo";


export const Header = () => {
    return (
        <S.Header>
            <S.Container>
                <S.Left>
                    <S.Link to={"/"}>
                        <Logo/>
                    </S.Link>
                    <LocationPicker/>
                </S.Left>
            </S.Container>
        </S.Header>
    )
}

