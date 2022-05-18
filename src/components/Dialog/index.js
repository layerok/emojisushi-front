import {cloneElement, useId, useState} from "react";
import {
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    FloatingPortal,
    FloatingOverlay,
} from "@floating-ui/react-dom-interactions";
import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {CloseSvg} from "../svg/CloseSvg";

export const Dialog = (
    {
        render,
        open: passedOpen = false,
        children,
        alignCenter,
    }
) => {
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

    const close = () => setOpen(false);

    return (
        <>
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
                        style={{
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(0, 0, 0, 0.4)"
                        }}
                    >
                        <S.Container
                            {...getFloatingProps({
                                ref: floating,
                                alignCenter,
                                "aria-labelledby": labelId,
                                "aria-describedby": descriptionId
                            })}
                        >
                            <S.CloseIcon onClick={() => close()}>
                                <SvgIcon width={"35px"} color={"white"}>
                                    <CloseSvg/>
                                </SvgIcon>
                            </S.CloseIcon>
                            {render({
                                close,
                                labelId,
                                descriptionId
                            })}
                        </S.Container>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </>
    );
};