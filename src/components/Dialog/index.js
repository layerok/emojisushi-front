import {cloneElement, useId, useState} from "react";
import {
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    FloatingPortal,
    FloatingOverlay,
    FloatingFocusManager
} from "@floating-ui/react-dom-interactions";
import * as S from "./styled";

export const Dialog = ({
                           render,
                           open: passedOpen = false,
                           children
                       }) => {
    const [open, setOpen] = useState(passedOpen);

    const { reference, floating, context } = useFloating({
        open,
        onOpenChange: setOpen
    });

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useRole(context),
        useDismiss(context)
    ]);

    return (
        <>
            <div style={{cursor: 'pointer'}}>
                {cloneElement(
                    children,
                    getReferenceProps({ ref: reference, ...children.props })
                )}
            </div>
            <FloatingPortal>
                {open && (
                    <FloatingOverlay
                        lockScroll
                        style={{
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(0, 0, 0, 0.3)"
                        }}
                    >
                        <FloatingFocusManager context={context}>
                            <S.Container
                                {...getFloatingProps({
                                    ref: floating,
                                    "aria-labelledby": labelId,
                                    "aria-describedby": descriptionId
                                })}
                            >
                                {render({
                                    close: () => setOpen(false),
                                    labelId,
                                    descriptionId
                                })}
                            </S.Container>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </>
    );
};