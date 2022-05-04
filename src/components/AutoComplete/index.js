import React, {
    forwardRef,
    useLayoutEffect,
    useEffect,
    useRef,
    useState
} from "react";
import {
    autoUpdate,
    size,
    useId,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    flip,
    useRole
} from "@floating-ui/react-dom-interactions";
import { data } from "./data";


const Item = forwardRef(({ children, active, ...rest }, ref) => {
    const id = useId();
    return (
        <li
            ref={ref}
            role="option"
            id={id}
            aria-selected={active}
            {...rest}
            style={{
                background: active ? "lightblue" : "none",
                padding: 4,
                cursor: "default",
                ...rest.style
            }}
        >
            {children}
        </li>
    );
});

export function AutoComplete() {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);

    const listRef = useRef([]);

    const {
        x,
        y,
        reference,
        floating,
        strategy,
        context,
        refs,
        update
    } = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [
            flip(),
            size({
                apply({ reference, height }) {
                    Object.assign(refs.floating.current?.style ?? {}, {
                        width: `${reference.width}px`,
                        maxHeight: `${height}px`
                    });
                },
                padding: 10
            }),

        ]
    });

    useLayoutEffect(() => {
        // Wait for `size` to have performed its work before attempting
        // to scroll the item into view: avoids infinite loops/jumps.
        const frame = requestAnimationFrame(() => {
            if (activeIndex != null) {
                listRef.current[activeIndex]?.scrollIntoView({
                    block: "nearest"
                });
            }
        });

        return () => cancelAnimationFrame(frame);
    }, [activeIndex]);

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
        [
            useRole(context, { role: "listbox" }),
            useDismiss(context),
            useListNavigation(context, {
                listRef,
                activeIndex,
                onNavigate: setActiveIndex,
                virtual: true,
                loop: true
            })
        ]
    );

    function onChange(event) {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            setOpen(true);
            setActiveIndex(0);
        } else {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [open, update, refs.reference, refs.floating]);

    const items = data.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    if (open && items.length === 0 && activeIndex !== null) {
        setActiveIndex(null);
    }

    return (
        <>
            <input
                {...getReferenceProps({
                    ref: reference,
                    onChange,
                    value: inputValue,
                    placeholder: "Enter fruit",
                    "aria-autocomplete": "list",
                    onKeyDown(event) {
                        if (
                            event.key === "Enter" &&
                            activeIndex != null &&
                            items[activeIndex]
                        ) {
                            setInputValue(items[activeIndex]);
                            setActiveIndex(null);
                            setOpen(false);
                        }
                    },
                    onBlur(event) {
                        if (
                            !refs.floating.current?.contains(
                                event.relatedTarget
                    )
                    ) {
                            setOpen(false);
                        }
                    }
                })}
            />
            {open && (
                <div
                    {...getFloatingProps({
                        ref: floating,
                        style: {
                            position: strategy,
                            left: x ?? "",
                            top: y ?? "",
                            background: "#eee",
                            color: "black",
                            overflowY: "auto"
                        }
                    })}
                >
                    <ul>
                        {items.map((item, index) => (
                            <Item
                                {...getItemProps({
                                    key: item,
                                    ref(node) {
                                        listRef.current[index] = node;
                                    },
                                    onClick() {
                                        setInputValue(item);
                                        setOpen(false);
                                    }
                                })}
                                active={activeIndex === index}
                            >
                                {item}
                            </Item>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}