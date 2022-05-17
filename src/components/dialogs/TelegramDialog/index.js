import {cloneElement} from "react";
import {Dialog} from "../../Dialog";
import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {TelegramSvg} from "../../svg/TelegramSvg";
import {ButtonFilled} from "../../Button";
import {CloseSvg} from "../../svg/CloseSvg";

export const TelegramDialog = ({children}) => {
    return <Dialog render={({close}) => (
        <S.Container>
            <S.CloseIcon onClick={() => close()}>
                <SvgIcon width={"35px"} color={"white"}>
                    <CloseSvg/>
                </SvgIcon>
            </S.CloseIcon>
            <SvgIcon color={"#FFE600"} width={"60px"}>
                <TelegramSvg strokeWidth={1}/>
            </SvgIcon>
            <S.Title>
                У нас появился Telegram!
            </S.Title>
            <S.Subtitle>
                Нажми по кнопке чтобы первым узнавать о новых акциях.
            </S.Subtitle>
            <S.Button>
                <ButtonFilled width={"250px"} >
                    Перейти в Telegram
                </ButtonFilled>
            </S.Button>
        </S.Container>

        )}>
            {cloneElement(children)}
        </Dialog>
}