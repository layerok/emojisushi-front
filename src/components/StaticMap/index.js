import {SvgIcon} from "../svg/SvgIcon";
import {MapPinSvg} from "../svg/MapPinSvg";
import {SvgButton} from "../SvgButton";
import {OdessaMap} from "../OdessaMap";

export const StaticMap = () => {
    return (
        <div>
            <OdessaMap width={"350px"} height={"187px"} topLeft={"10px"} topRight={"10px"}>
                <SvgButton>
                    <SvgIcon color={"black"}>
                        <MapPinSvg/>
                    </SvgIcon>
                </SvgButton>
            </OdessaMap>
        </div>
    )
}