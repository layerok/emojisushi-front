import {SvgIcon} from "../../svg/SvgIcon";
import {NotifyModal} from "../NotifyModal";
import {LowKeySvg} from "../../svg/LowKeySvg";
import {useTranslation} from "react-i18next";


export const RestaurantClosed = (
    {
        open
    }
) => {


    const {t} = useTranslation();
    return <NotifyModal
        open={open}
        renderTitle={() => t('restaurantClosed.closed')}
        renderSubtitle={() => t('restaurantClosed.time')}
        renderIcon={() => (
            <SvgIcon color={"#FFE600"} width={"60px"}>
                <LowKeySvg/>
            </SvgIcon>
        )}
    >
        <div></div>
    </NotifyModal>
}