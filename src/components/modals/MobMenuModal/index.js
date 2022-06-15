import {cloneElement} from "react";
import {BaseModal} from "../BaseModal";
import * as S from "./styled";
import {ContactsModal} from "../ContactsModal";
import {NavLink} from "../../NavLink";
import {FlexBox} from "../../FlexBox";
import {LocationPickerPopover} from "../../popovers/LocationPickerPopover";
import {SvgIcon} from "../../svg/SvgIcon";
import {HeartSvg} from "../../svg/HeartSvg";
import {useTranslation} from "react-i18next";

export const MobMenuModal = ({children}) => {
    const overlayStyles = {
        justifyItems: 'end',
        alignItems: 'start',
        background: "rgba(0, 0, 0, 0.4)",
        display: 'grid',
        zIndex: 999999
    };
    const {t} = useTranslation();
    return <BaseModal overlayStyles={overlayStyles} render={({close}) => (
        <S.Wrapper>
            <S.Item>
                <LocationPickerPopover width={"226px"} backgroundColor={"#1C1C1C"}/>
            </S.Item>
            <S.Item>
            <ContactsModal onClick={() => {
                close();
            }}>
                <div>{t('mobMenuModal.contacts')}</div>
            </ContactsModal>
            </S.Item>
            <S.Item>
                <NavLink to={"/dostavka-i-oplata"}>
                    <div>{t('mobMenuModal.delivery')}</div>
                </NavLink>
            </S.Item>
            <S.Item>
                <FlexBox justifyContent={"space-between"} alignItems={"center"}>
                    <NavLink to={"/wishlist"}>
                        <div>{t('common.favorite')}</div>
                    </NavLink>
                    <SvgIcon color={"#FFE600"} width={"25px"}>
                        <HeartSvg />
                    </SvgIcon>
                </FlexBox>
            </S.Item>
        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </BaseModal>
}