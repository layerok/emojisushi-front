import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {MapPinSvg} from "../svg/MapPinSvg";
import {SvgButton} from "../SvgButton";
import {withResponsive} from "../../common/hoc/withResponsive";


const StaticMapRaw = (
    {
        width,
        height,
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
        generateResponsive,
        responsive=[],
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
                      generateResponsive={generateResponsive}
                      responsive={responsive}
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

StaticMapRaw.defaultProps = {
    topLeft: "15px",
    topRight: "15px",
    bottomRight: "15px",
    bottomLeft: "15px",
}

export const StaticMap = withResponsive(StaticMapRaw);

