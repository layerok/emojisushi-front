import {CloseIcon} from "../../CloseIcon";
import {forwardRef} from "react";

export const CloseModalIcon = forwardRef<HTMLSpanElement, {
    close: () => void;
    width?: string;
}>(({close, width = "35px"}, ref) => {
    return <CloseIcon ref={ref} onClick={() => close()} width={width}/>
})
