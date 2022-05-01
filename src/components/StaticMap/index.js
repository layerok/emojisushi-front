import MapSrc from "../../assets/img/odessa-map.png";
import {SvgIcon} from "../svg/SvgIcon";
import {MapPinSvg} from "../svg/MapPinSvg";

export const StaticMap = () => {
    return (
        <div>
            <img src={MapSrc} alt="map"/>
            <SvgIcon color={"white"}>
                <MapPinSvg/>
            </SvgIcon>
        </div>
    )
}