import {cloneElement, forwardRef} from "react";

export const Sticky = forwardRef((
    {
        children,
        show,
        top,
        right,
        bottom,
        left,
        style
    }, ref) => {

    return (
        <div style={{
            position: "fixed",
            display: show ? "block": "none",
            zIndex: 999,
            top,
            right,
            bottom,
            left,
            ...style
        }}>

            {cloneElement(children, {ref} )}

        </div>
    )

})