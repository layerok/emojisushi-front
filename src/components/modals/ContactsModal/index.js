import {Modal} from "../Modal";
import {cloneElement} from "react";
import phones from "../../../common/mock/data/phones.json";
import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {PhoneSvg} from "../../svg/PhoneSvg";
import {InstagramSvg} from "../../svg/InstagramSvg";
import {FlexBox} from "../../FlexBox";
import {TelegramSvg} from "../../svg/TelegramSvg";
import {StaticMap} from "../../StaticMap";
import {TelegramModal} from "../TelegramModal";
import {useBreakpoint} from "../../../common/hooks/useBreakpoint";
import {useTranslation} from "react-i18next";

export const ContactsModal = ({children, onClick = () => {}}) => {

    const breakpoint = useBreakpoint();
    const width = breakpoint !== 'pc' ? "375px": false;
    const {t} = useTranslation();

    return <Modal width={width} onClick={onClick} render={({close}) => (
        <div>
            <S.Wrapper >
                <S.Title>{t('contactsModal.contacts')}</S.Title>
                <S.Phones>
                    <SvgIcon style={{marginRight: '11px'}} width={"25px"} color={"white"}>
                        <PhoneSvg/>
                    </SvgIcon>
                    {phones.map((phone, i) => (
                        <S.Phone key={i}>{phone}</S.Phone>
                    ))}
                </S.Phones>
                <S.Socials>
                    <FlexBox style={{marginRight: '20px'}} alignItems={"center"}>
                        <SvgIcon style={{marginRight: '10px'}} width={"25px"} color={"white"}>
                            <InstagramSvg/>
                        </SvgIcon>
                        <span>
                            emoji_sushi
                        </span>
                    </FlexBox>
                    <TelegramModal>
                        <FlexBox alignItems={"center"}>
                            <SvgIcon style={{marginRight: '10px'}} width={"25px"} color={"white"}>
                                <TelegramSvg/>
                            </SvgIcon>
                            <span>
                            Telegram
                        </span>
                        </FlexBox>
                    </TelegramModal>
                </S.Socials>
            </S.Wrapper>
            <StaticMap style={{marginTop: '30px'}} height={"220px"}/>

        </div>
    )} >
        {cloneElement(children)}
    </Modal>;
}