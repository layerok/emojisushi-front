import * as S from "./styled";
import MapLocationPinSrc from "../../assets/ui/icons/map-location-pin.svg"
import CaretDownSrc from "../../assets/ui/icons/caret-down.svg"

import {
    useFloating,
    autoUpdate,
    useInteractions,
    useClick,
    useHover,
    useFocus,
    useRole,
    shift,
    offset
} from '@floating-ui/react-dom-interactions';

import {useEffect, useState,} from "react";

export const LocationPicker = () => {

    const [open, setOpen] = useState(false);

    const {x, y, reference, floating, strategy, update, refs, context} = useFloating({
        placement: 'bottom',
        strategy: 'absolute',
        middleware: [shift(), offset(22)],
        open,
        onOpenChange: setOpen
    });

    const {getReferenceProps, getFloatingProps} =
        useInteractions([
            useClick(context),
            useFocus(context),
            useRole(context),
        ]);

    useEffect(() => {
        if (!refs.reference.current || !refs.floating.current) {
            return;
        }

        // Only call this when the floating element is rendered
        return autoUpdate(
            refs.reference.current,
            refs.floating.current,
            update
        );
    }, [refs.reference, refs.floating, update]);

    return (
        <>
            <S.Container {...getReferenceProps({ref: reference})} >
                <S.Icon>
                    <img src={MapLocationPinSrc} alt="location picker"/>
                </S.Icon>
                <S.Label>
                    Одесса, Базарная 69
                </S.Label>
                <S.CaretDown>
                    <img src={CaretDownSrc} alt="caret down"/>
                </S.CaretDown>
            </S.Container>
            {open && (
                <S.Options {...getFloatingProps({
                    ref: floating,
                    style: {
                        position: strategy,
                        left: x ?? '',
                        top: y ?? '',
                    },
                })}  >
                    <S.Option>
                        Одесса, Базарная 69
                    </S.Option>
                    <S.Option>
                        Одесса, Базарная 69
                    </S.Option>
                </S.Options>
            )}

        </>
    );
}