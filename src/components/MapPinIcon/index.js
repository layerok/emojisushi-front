import {MapPinSvg} from "../MapPinSvg";
import {SvgIcon} from "../SvgIcon";


export const MapPinIcon = ({color="white"}) => {
    return (
        <SvgIcon color={color}>
            <MapPinSvg/>
        </SvgIcon>

    )
}