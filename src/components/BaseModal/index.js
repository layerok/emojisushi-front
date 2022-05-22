import {cloneElement, useId, useState} from "react";
import {
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    FloatingPortal,
    FloatingNode,
    FloatingOverlay, useFloatingNodeId,
} from "@floating-ui/react-dom-interactions";


export const BaseModal = (
    {
        render,
        overlayStyles,
        open: passedOpen = false,
        children,
        useDismiss: passedUseDismiss = true
    }
) => {
    const [open, setOpen] = useState(passedOpen);

    const nodeId = useFloatingNodeId();

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
        useDismiss(context, {
            enabled: passedUseDismiss
        })
    ]);

    const close = () => setOpen(false);

    return (
        <FloatingNode id={nodeId}>
            <div style={{cursor: 'pointer', display: 'flex'}}>
                {cloneElement(
                    children,
                    getReferenceProps({ ref: reference, ...children.props })
                )}
            </div>
            <FloatingPortal>
                {open && (
                    <FloatingOverlay
                        lockScroll
                        style={{...overlayStyles}}
                    >
                        <div
                            {...getFloatingProps({
                                ref: floating,
                                "aria-labelledby": labelId,
                                "aria-describedby": descriptionId
                            })}
                        >
                            {render({
                                close,
                                labelId,
                                descriptionId
                            })}
                        </div>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </FloatingNode>
    );
};