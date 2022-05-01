import MapSrc from "../../assets/img/odessa-map.png";
import {SvgIcon} from "../svg/SvgIcon";
import {MapPinSvg} from "../svg/MapPinSvg";

export const StaticMap = () => {
    return (
        <div>
            <img src={MapSrc} alt="map"/>
        <div style={{
            backgroundColor:"#FFE600",
            boxShadow: "0 0 15px rgba(255, 230, 0, 0.5)",
            borderRadius: "5px"
        }}>
            <SvgIcon color={"white"}>
                <MapPinSvg/>
            </SvgIcon>
        </div>


        </div>
    )
}