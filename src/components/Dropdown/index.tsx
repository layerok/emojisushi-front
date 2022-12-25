import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
    FloatingPortal,
    FloatingFocusManager, useInteractions, useListNavigation, useClick, useDismiss, useRole
} from "@floating-ui/react-dom-interactions";
import {forwardRef, HTMLProps, PropsWithChildren, useId, useMemo, useRef, useState} from "react";
import {useEffect} from "react";
import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {CaretDownSvg} from "../svg/CaretDownSvg";

type IOptionProps = HTMLProps<HTMLDivElement> & PropsWithChildren<{
    name: string;
    active: boolean;
    selected: boolean;
}>

const Option = forwardRef<HTMLDivElement, IOptionProps>(function Option(
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
                    ? "#272727"
                    : selected
                        ? "#272727"
                        : "none",
                borderRadius: 4,
                userSelect: "none",
                padding: "10px 15px",
                cursor: "pointer"
            }}
        >
            {children}
        </div>
    );
});

type IDropdownProps = {
    options: {
        label: string;
        value: string | number;
    }[];
    width: string;
    initiallySelectedValue: null | string | number;
}

export const Dropdown = (
    {
        options = [],
        width = "100px",
        initiallySelectedValue = null
    }: IDropdownProps
) => {

    const [open, setOpen] = useState(false);

    const [activeIndex, setActiveIndex] = useState(null);
    const [placement, setPlacement] = useState(null);
    const [selectedValue, setSelectedValue] = useState(initiallySelectedValue);

    const selectedOption = useMemo(() => options.find(({value}) => value === selectedValue), [
        selectedValue,
        options
    ])

    const listRef = useRef([]);
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
        middleware: [offset(0), flip(), shift()],
    });

    useEffect(() => {
        if (open && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [open, update, refs.reference, refs.floating]);

    const onNavigate = (index) => {
        return open ? setActiveIndex(index) : () => {};
    }

    const { getReferenceProps, getFloatingProps, getItemProps} = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context, {
            role: 'listbox'
        }),
        useListNavigation(context, {
            listRef,
            onNavigate,
            activeIndex,
            orientation: "vertical",
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
                    <span id="day-label" aria-label={selectedOption?.label}>
                        {selectedOption?.label}
                    </span>
                )}
                <SvgIcon style={{
                    position: 'absolute',
                    right: "15px",
                    top: "12px"
                }} width={"15px"}>
                    <CaretDownSvg/>
                </SvgIcon>
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
                            {...getFloatingProps({
                                onKeyDown: (e) => {
                                    if (e.key === "Enter") {
                                        handleOptionClick();
                                    }
                                }
                            })}
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
                                                onClick: handleOptionClick,
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
