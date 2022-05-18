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
        mobileFirst,
        style
    }) => {
    return (
        <S.Background style={style}
                      width={width}
                      height={height}
                      topRight={topRight}
                      topLeft={topLeft}
                      bottomLeft={bottomLeft}
                      bottomRight={bottomRight}
                      mobileFirst={mobileFirst}
        >

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
    topLeft: "15px",
    topRight: "15px",
    bottomRight: "15px",
    bottomLeft: "15px",
}


