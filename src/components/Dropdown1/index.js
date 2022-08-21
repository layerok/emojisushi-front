import {
    autoUpdate,
    flip,
    size,
    offset,
    shift,
    useFloating,
    FloatingPortal,
    FloatingFocusManager, useInteractions, useListNavigation, useClick, useDismiss, useRole
} from "@floating-ui/react-dom-interactions";
import {forwardRef, useId, useMemo, useRef, useState} from "react";
import {useEffect} from "react";
import * as S from "./styled";



const Option = forwardRef(function Option(
    { name, active, selected, children, ...props },
    ref
) {
    const id = useId();
    return (
        <div
            {...props}
            ref={ref}
            id={id}
            role="option"
            aria-selected={selected}
            style={{
                background: active
                    ? "rgba(0, 255, 255, 0.5)"
                    : selected
                        ? "rgba(0, 10, 20, 0.1)"
                        : "none",
                border: active
                    ? "1px solid rgba(0, 225, 255, 1)"
                    : "1px solid transparent",
                borderRadius: 4,
                textAlign: "center",
                cursor: "default",
                userSelect: "none",
                padding: 0
            }}
        >
            {children}
        </div>
    );
});

export const Dropdown1 = (
    {
        options = [],
        width = 100
    }
) => {

    const [open, setOpen] = useState(false);

    const [activeIndex, setActiveIndex] = useState(null);
    const [placement, setPlacement] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [search, setSearch] = useState("");

    const selectedOption = useMemo(() => options.find(({value}) => value === selectedValue), [
        selectedValue,
        options
    ])

    const listRef = useRef([]);

    const noResultsId = useId();
    const buttonId = useId();
    const listboxId = useId();

    const {
        x,
        y,
        reference,
        floating,
        strategy,
        context,
        refs,
        update,
        placement: resultantPlacement
    } = useFloating({
        placement: placement ?? "bottom",
        open,
        onOpenChange: setOpen,
        // We don't want flipping to occur while searching, as the floating element
        // will resize and cause disorientation.
        middleware: [offset(0), ...(placement ? [] : [flip()]), shift()],
    });

    useEffect(() => {
        if (open && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [open, update, refs.reference, refs.floating]);

    const { getReferenceProps, getFloatingProps, getItemProps} = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context),
        useListNavigation(context, {
            listRef,
            onNavigate: open ? setActiveIndex : () => {},
            activeIndex,
            cols: 1,
            orientation: "horizontal",
            loop: true,
            focusItemOnOpen: false,
            virtual: true,
            allowEscape: true
        })
    ]);


    useEffect(() => {
        if (open) {
            setPlacement(resultantPlacement);
        } else {
            setSearch("");
            setActiveIndex(null);
            setPlacement(null);
        }
    }, [open, resultantPlacement]);


    const handleOptionClick = () => {
        if (activeIndex !== null) {
            setSelectedValue(options[activeIndex].value);
            setOpen(false);
        }
    };


    const {
        "aria-activedescendant": ignoreAria,
        ...floatingProps
    } = getFloatingProps(getFloatingProps());


    return (
        <S.Dropdown >
            <S.Reference
                width={width}
                open={open}
                placement={resultantPlacement}
                ref={reference}
                id={buttonId}
                aria-label="Choose day when you were born"
                aria-describedby="day-label"
                {...getReferenceProps()}>
                {selectedValue && (
                    <span id="day-label" aria-label={
                        selectedOption?.label
                    }>
                        {selectedOption?.label}
                    </span>
                )}
            </S.Reference>
            <FloatingPortal>
                {open && (
                    <FloatingFocusManager context={context} initialFocus={1}>
                        <S.Content
                            width={width}
                            open={open}
                            placement={resultantPlacement}
                            ref={floating}
                            style={{
                                position: strategy,
                                left: x ?? 0,
                                top: y ?? 0
                            }}
                            aria-labelledby={buttonId}
                            {...floatingProps}
                        >

                            {options.length > 0 && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                    role="listbox"
                                    id={listboxId}
                                >
                                    {options.map(({ value, label }, index) => (
                                        <Option
                                            key={value}
                                            name={label}
                                            ref={(node) => {
                                                listRef.current[index] = node;
                                            }}
                                            selected={selectedValue === value}
                                            active={activeIndex === index}
                                            {...getItemProps({
                                                onClick: handleOptionClick
                                            })}
                                        >
                                            {label}
                                        </Option>
                                    ))}
                                </div>
                            )}
                        </S.Content>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </S.Dropdown>

    );
}