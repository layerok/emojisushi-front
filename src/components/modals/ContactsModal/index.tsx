import {Modal} from "../Modal";
import {cloneElement} from "react";
import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {PhoneSvg} from "../../svg/PhoneSvg";
import {InstagramSvg} from "../../svg/InstagramSvg";
import {FlexBox} from "../../FlexBox";
import {TelegramSvg} from "../../svg/TelegramSvg";
import {StaticMap} from "../../StaticMap";
import {TelegramModal} from "../TelegramModal";
import {useBreakpoint} from "~common/hooks/useBreakpoint";
import {useTranslation} from "react-i18next";
import {InstagramLink} from "~layout/Footer/styled";
import { observer} from "mobx-react";
import { useSpot } from "~hooks/use-spot";

export const ContactsModalRaw = (
    {
        children,
    }) => {

    const breakpoint = useBreakpoint();
    const width = breakpoint !== 'pc' ? "375px": undefined;
    const { t } = useTranslation();
    const spot = useSpot();

    return <Modal width={width} render={({close}) => (
        <div>
            <S.Wrapper >
                {spot.hasPhones && (
                    <>
                        <S.Title>{t('contactsModal.contacts')}</S.Title>
                        <S.Phones>
                            <SvgIcon style={{marginRight: '11px'}} width={"25px"} color={"white"}>
                                <PhoneSvg/>
                            </SvgIcon>
                            {spot.phones.split(',').map((phone, i) => (
                                <S.Phone key={i}>{phone}</S.Phone>
                            ))}
                        </S.Phones>
                    </>
                )}

                <S.Socials>
                    <FlexBox style={{marginRight: '20px'}} alignItems={"center"}>
                        <SvgIcon style={{marginRight: '10px'}} width={"25px"} color={"white"}>
                            <InstagramSvg/>
                        </SvgIcon>
                        <InstagramLink href={"https://www.instagram.com/emoji_sushi_/"} target={"_blank"}>
                            emoji_sushi
                        </InstagramLink>
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

export const ContactsModal = observer(ContactsModalRaw);
