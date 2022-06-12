import {SvgIcon} from "../../svg/SvgIcon";
import {NotifyModal} from "../NotifyModal";
import {LowKeySvg} from "../../svg/LowKeySvg";
import {useTranslation} from "react-i18next";

const isClosed = ({start,end}) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes()
    return (hours < start[0]  || (start[0] === hours && minutes < start[1])) ||
        (hours > end[0] || (end[0] === hours && minutes > end[1] ));
}

export const RestaurantClosed = () => {

    const closed = isClosed({
        start: [10, 0],
        end: [22, 45],
    });
    const {t} = useTranslation();
    return <NotifyModal
        open={closed}
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