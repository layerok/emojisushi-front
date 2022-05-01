import {MapPinSvg} from "../../svg/MapPinSvg";
import {SvgIcon} from "../../svg/SvgIcon";


export const MapPinIcon = ({color="white"}) => {
    return (
        <SvgIcon color={color}>
            <MapPinSvg/>
        </SvgIcon>

    )
}