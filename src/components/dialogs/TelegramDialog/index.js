import {cloneElement} from "react";
import {SvgIcon} from "../../svg/SvgIcon";
import {TelegramSvg} from "../../svg/TelegramSvg";
import {ButtonFilled} from "../../Button";
import {NotifyDialog} from "../../NotifyDialog";

export const TelegramDialog = ({children, ...rest}) => {
    return <NotifyDialog
        renderTitle={() => ("У нас появился Telegram!")}
        renderSubtitle={() => ("Нажми на кнопку чтобы первым узнавать о новых акциях.")}
        renderIcon={() => (
            <SvgIcon color={"#FFE600"} width={"60px"}>
                <TelegramSvg strokeWidth={1}/>
            </SvgIcon>
        )}
        renderButton={() => (
            <ButtonFilled width={"250px"} >
                Перейти в Telegram
            </ButtonFilled>
        )}
        {...rest}
    >
        {cloneElement(children)}
    </NotifyDialog>
}