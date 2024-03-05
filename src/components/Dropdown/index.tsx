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
import styled from "styled-components";

type IOptionProps = HTMLProps<HTMLDivElement> &
  PropsWithChildren<{
    name: string;
    $active: boolean;
    $selected: boolean;
    $disabled: boolean;
  }>;

const Option = styled.div<IOptionProps>`
  position: relative;
  background: ${({ $active, $selected, $disabled, theme }) =>
    $disabled
      ? "none"
      : $active
      ? theme.colors.canvas.inset4
      : $selected
      ? theme.colors.canvas.inset4
      : "none"};

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 10px;
  user-select: none;
  padding: 10px 15px;
`;

type IDropdownProps = {
  options: {
    label: string;
    value: string | number;
    disabledText?: string;
    disabled?: boolean;
  }[];
  width: string;
  value: null | string | number;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  showSkeleton?: boolean;
};

export const Dropdown = (props: IDropdownProps) => {
  const {
    options = [],
    width = "100px",
    value,
    placeholder,
    onChange,
    showSkeleton = false,
  } = props;
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
                    const option = options[activeIndex];
                    if (e.key === "Enter" && !option.disabled) {
                      if (activeIndex !== null) {
                        setOpen(false);
                      }
                      onChange(option.value);
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
                        role="option"
                        $disabled={option.disabled}
                        $selected={option.value === value}
                        $active={activeIndex === index}
                        {...getItemProps({
                          onClick: () => {
                            if (!option.disabled) {
                              setOpen(false);
                              onChange(option.value);
                            }
                          },
                        })}
                      >
                        {!!option.disabled && !!option.disabledText && (
                          <OptionComment>{option.disabledText}</OptionComment>
                        )}

                        <LabelContainer $blurred={option.disabled}>
                          {option.label}
                        </LabelContainer>
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

const LabelContainer = styled.div<{
  $blurred: boolean;
}>`
  filter: ${({ $blurred }) => ($blurred ? "blur(1px)" : "none")};
`;

const OptionComment = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
  font-weight: 500;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.warning.fg};
`;
