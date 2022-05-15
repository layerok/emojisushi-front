import {SvgIcon} from "../../svg/SvgIcon";
import {PencilSvg} from "../../svg/PencilSvg";
import {UIButton} from "../UIButton";

export const EditButton = () => {
    return <UIButton text={"Отредактировать заказа"}>
        <SvgIcon color={"white"} width={"25px"}>
            <PencilSvg/>
        </SvgIcon>
    </UIButton>
}