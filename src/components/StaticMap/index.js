import MapSrc from "../../assets/img/odessa-map.png";
import {MapPinIcon} from "../icons/MapPinIcon";

export const StaticMap = () => {
    return (
        <div>
            <img src={MapSrc} alt="map"/>
            <MapPinIcon color={"white"}/>
        </div>
    )
}