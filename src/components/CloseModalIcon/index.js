import {CloseIcon} from "../CloseIcon";

export const CloseModalIcon = ({close, width = "35px"}) => {
    return <CloseIcon onClick={() => close()} width={width}/>
}