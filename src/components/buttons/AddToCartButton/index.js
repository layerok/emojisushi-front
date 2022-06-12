import {ButtonCounter} from "../../Counter";
import {PendingButton} from "../Button";
import {ButtonOutline} from "../Button";
import {useTranslation} from "react-i18next";

export const AddToCartButton = (
    {
        pending,
        count,
        handleAdd
    }
) => {
    const {t} = useTranslation();
    if(pending) {
        return <PendingButton/>;
    }

    if(count) {
        return <ButtonCounter
            handleIncrement={() => {
                handleAdd(1);
            }}
            handleDecrement={() => {
                handleAdd(-1);
            }}
            count={count}
        />
    }
    return <ButtonOutline onClick={() => handleAdd(1)}>{t('order.order_btn')}</ButtonOutline>;
}