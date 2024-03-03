import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  FloatingPortal,
  FloatingFocusManager,
  useInteractions,
  useListNavigation,
  useClick,
  useDismiss,
  useRole,
} from "@floating-ui/react";
import {
  forwardRef,
  HTMLProps,
  PropsWithChildren,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEffect } from "react";
import * as S from "./styled";
import { SvgIcon } from "../SvgIcon";
import { CaretDownSvg } from "../svg/CaretDownSvg";
import { SkeletonWrap } from "~components";
import { useTheme } from "styled-components";

type IOptionProps = HTMLProps<HTMLDivElement> &
  PropsWithChildren<{
    name: string;
    active: boolean;
    selected: boolean;
  }>;

const Option = forwardRef<HTMLDivElement, IOptionProps>(function Option(
  { name, active, selected, children, ...props },
  ref
) {
  const id = useId();
  const theme = useTheme();
  return (
    <div
      {...props}
      ref={ref}
      id={id}
      role="option"
      aria-selected={selected}
      style={{
        background: active
          ? theme.colors.canvas.inset4
          : selected
          ? theme.colors.canvas.inset4
          : "none",
        borderRadius: 10,
        userSelect: "none",
        padding: "10px 15px",
        cursor: "pointer",
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
  value: null | string | number;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  showSkeleton?: boolean;
};

export const Dropdown = ({
  options = [],
  width = "100px",
  value,
  placeholder,
  onChange,
  showSkeleton = false,
}: IDropdownProps) => {
  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(options.length > 0 ? 0 : null);
  const [placement, setPlacement] = useState(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [value, options]
  );

  const listRef = useRef([]);
  const buttonId = useId();
  const listboxId = useId();

  const {
    x,
    y,
    strategy,
    context,
    refs,
    update,
    placement: resultantPlacement,
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
      // todo: polyfill ResizeObserver
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  const onNavigate = (index) => {
    return open ? setActiveIndex(index) : () => {};
  };

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useDismiss(context),
      useRole(context, {
        role: "listbox",
      }),
      useListNavigation(context, {
        listRef,
        onNavigate,
        activeIndex,
        orientation: "vertical",
        loop: true,
        focusItemOnOpen: false,
        virtual: true,
        allowEscape: true,
      }),
    ]
  );

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
      setOpen(false);
    }
  };

  return (
    <SkeletonWrap borderRadius={10} loading={showSkeleton}>
      <S.Dropdown>
        <S.Reference
          width={width}
          open={open}
          placement={resultantPlacement}
          ref={refs.setReference}
          id={buttonId}
          {...getReferenceProps()}
        >
          {(value || placeholder) && (
            <span>{selectedOption?.label || placeholder}</span>
          )}
          <SvgIcon
            style={{
              position: "absolute",
              right: "15px",
              top: "12px",
            }}
            width={"15px"}
          >
            <CaretDownSvg />
          </SvgIcon>
        </S.Reference>
        <FloatingPortal>
          {open && (
            <FloatingFocusManager context={context} initialFocus={1}>
              <S.Content
                width={width}
                open={open}
                placement={resultantPlacement}
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  left: x ?? 0,
                  top: y ?? 0,
                }}
                aria-labelledby={buttonId}
                {...getFloatingProps({
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      handleOptionClick();
                      onChange(options[activeIndex].value);
                    }
                  },
                })}
              >
                {options.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    role="listbox"
                    id={listboxId}
                  >
                    {options.map((option, index) => (
                      <Option
                        key={option.value}
                        name={option.label}
                        ref={(node) => {
                          listRef.current[index] = node;
                        }}
                        selected={option.value === value}
                        active={activeIndex === index}
                        {...getItemProps({
                          onClick: () => {
                            handleOptionClick();
                            onChange(option.value);
                          },
                        })}
                      >
                        {option.label}
                      </Option>
                    ))}
                  </div>
                )}
              </S.Content>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </S.Dropdown>
    </SkeletonWrap>
  );
};
