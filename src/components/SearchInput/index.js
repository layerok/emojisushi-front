import {Input} from "../Input";
import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {MagnifierSvg} from "../svg/MagnifierSvg";

export const SearchInput = () => {
    return (
        <S.Search>
            <Input/>
            <S.IconBtn>
                <SvgIcon color={"white"} width={"25px"} height={"25px"}>
                    <MagnifierSvg/>
                </SvgIcon>
            </S.IconBtn>
        </S.Search>
    )
}