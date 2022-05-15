
import {Counter} from "../Counter";
import {PendingButton} from "../PendingButton";
import {ButtonOutline} from "../ButtonOutline";

export const AddToCartButton = (
    {
        pending,
        count,
        width
    }
) => {

    if(pending) {
        return <PendingButton/>;
    }

    if(count) {
        return <Counter count={count}/>
    }

    return <ButtonOutline>
        Заказать
    </ButtonOutline>;
}