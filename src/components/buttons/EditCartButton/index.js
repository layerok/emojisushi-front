import {SvgIcon} from "../../svg/SvgIcon";
import {PencilSvg} from "../../svg/PencilSvg";
import {UIButton} from "../UIButton";
import {forwardRef} from "react";

export const EditCartButton = forwardRef((props, ref) => {
    return <UIButton ref={ref} text={"Отредактировать заказа"}>
        <SvgIcon color={"white"} width={"25px"}>
            <PencilSvg/>
        </SvgIcon>
    </UIButton>
})