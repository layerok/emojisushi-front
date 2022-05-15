import { cloneElement, useState } from "react";
import {
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useRole,
    useDismiss
} from "@floating-ui/react-dom-interactions";

export const Tooltip = ({ children, label, placement = "top" }) => {
    const [open, setOpen] = useState(false);

    const { x, y, reference, floating, strategy, context } = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [offset(5), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context),
        useFocus(context),
        useRole(context, { role: "tooltip" }),
        useDismiss(context)
    ]);

    return (
        <>
            {cloneElement(
                children,
                getReferenceProps({ ref: reference, ...children.props })
            )}
            {open && (
                <div
                    {...getFloatingProps({
                        ref: floating,
                        className: "Tooltip",
                        style: {
                            position: strategy,
                            top: y ?? "",
                            left: x ?? ""
                        }
                    })}
                >
                    {label}
                </div>
            )}
        </>
    );
};
