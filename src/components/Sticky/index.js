import {forwardRef} from "react";

export const Sticky = forwardRef((
    {
        children,
        show
    }, ref) => {

    return (
        <div ref={ref} style={{
            position: "fixed",
            top: "30px",
            right: "30px",
            display: show ? "block": "none",
        }}>

            {children}

        </div>
    )

})