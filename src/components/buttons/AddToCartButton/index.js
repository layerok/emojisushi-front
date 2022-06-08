import {ButtonCounter} from "../../Counter";
import {PendingButton} from "../Button";
import {ButtonOutline} from "../Button";

export const AddToCartButton = (
    {
        pending,
        count,
        handleAdd
    }
) => {

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

    return <ButtonOutline onClick={() => handleAdd(1)}>Заказать</ButtonOutline>;
}