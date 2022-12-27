import {SvgIcon} from "../../svg/SvgIcon";
import {PencilSvg} from "../../svg/PencilSvg";
import {UIButton} from "../UIButton";
import {forwardRef} from "react";
import {useTranslation} from "react-i18next";

export const EditCartButton = forwardRef((props, ref) => {
    const {t} = useTranslation();
    return <UIButton ref={ref} text={t('editBtn.edit_order')}>
        <SvgIcon color={"white"} width={"25px"}>
            <PencilSvg/>
        </SvgIcon>
    </UIButton>
})