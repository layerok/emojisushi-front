import {Counter} from "../Counter";
import {PendingButton} from "../Button";
import {ButtonOutline} from "../Button";

export const AddToCartButton = (
    {
        pending,
        count
    }
) => {

    if(pending) {
        return <PendingButton/>;
    }

    if(count) {
        return <Counter count={count}/>
    }

    return <ButtonOutline>Заказать</ButtonOutline>;
}