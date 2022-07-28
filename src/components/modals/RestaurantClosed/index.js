import {SvgIcon} from "../../svg/SvgIcon";
import {NotifyModal} from "../NotifyModal";
import {LowKeySvg} from "../../svg/LowKeySvg";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";


export const RestaurantClosed = inject(
    'AppStore'
)(observer((
    {
        open,
        AppStore
    }
) => {


    const {t} = useTranslation();
    return <NotifyModal
        open={open}
        renderTitle={() => t('restaurantClosed.closed')}
        renderSubtitle={() => `${t('restaurantClosed.time')}: ${AppStore.formatWorkingHours()}`}
        renderIcon={() => (
            <SvgIcon color={"#FFE600"} width={"60px"}>
                <LowKeySvg/>
            </SvgIcon>
        )}
    >
        <div></div>
    </NotifyModal>
}))