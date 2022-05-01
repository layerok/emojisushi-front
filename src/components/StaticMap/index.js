import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {MapPinSvg} from "../svg/MapPinSvg";
import {SvgButton} from "../SvgButton";

export const StaticMap = (
    {
        width,
        height,
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
        style
    }) => {
    return (
        <S.Background style={
            {
                width,
                height,
                borderTopRightRadius: topRight,
                borderTopLeftRadius: topLeft,
                borderBottomLeftRadius: bottomLeft,
                borderBottomRightRadius: bottomRight,
                ...style

            }
        }>

            <SvgButton>
                <SvgIcon color={"black"}>
                    <MapPinSvg/>
                </SvgIcon>
            </SvgButton>
            <S.MapText>
                Смотреть на <br/>карте
            </S.MapText>

        </S.Background>

    )
}

StaticMap.defaultProps = {
    topLeft: "0",
    topRight: "0",
    bottomRight: "0",
    bottomLeft: "0",
}