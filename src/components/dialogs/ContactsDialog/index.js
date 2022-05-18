import {Dialog} from "../../Dialog";
import {cloneElement} from "react";

export const ContactsDialog = ({children}) => {
    return <Dialog render={() => (
        "Контакты"
    )}>
        {cloneElement(children)}
    </Dialog>;
}