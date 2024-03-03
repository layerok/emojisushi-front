import * as S from "./styled";
import { Popover } from "../Popover";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "styled-components";

type Props<Option> = {
  options?: Option[];
  asFlatArray?: boolean;
  offset?: number;
  open?: boolean;
  disable?: boolean;
  nameAccessor?: string;
  idAccessor?: string;
  selectedIndex: number;
  children: ReactNode | { (props: { selectedOption?: Option }): ReactNode };
  backgroundColor?: string;
  resolveOptionName?: (props: { option: Option }) => string;
  width?: string;
  onSelect?: (props: {
    close: () => void;
    option: Option;
    index: number;
  }) => void;
};

export function DropdownPopover<Option>(props: Props<Option>) {
  const theme = useTheme();
  const {
    onSelect,
    options = [],
    asFlatArray = false,
    offset = 0,
    open: initialOpen = false,
    disable = false,
    nameAccessor = "name",
    idAccessor = "id",
    selectedIndex,
    children,
    backgroundColor = theme.colors.canvas.inset,
    resolveOptionName: resolveOptionNamePassed,
    width = "100%",
  } = props;
  const [selectedOption, setSelectedOption] = useState(options[selectedIndex]);

  useEffect(() => {
    setSelectedOption(options[selectedIndex]);
  }, [selectedIndex, options]);

  const handleSelect = ({ close, option, index }) => {
    onSelect && onSelect({ close, option, index });
  };

  const resolveOptionName = ({ option }) => {
    if (resolveOptionNamePassed) {
      return resolveOptionNamePassed({ option });
    }
    return asFlatArray ? option : option[nameAccessor];
  };

  const resolveOptionId = ({ option }) => {
    return asFlatArray ? option : option[idAccessor];
  };

  return (
    <>
      <Popover
        offset={offset}
        open={initialOpen}
        disable={disable}
        render={({ close }) => (
          <S.Options width={width} backgroundColor={backgroundColor}>
            {options.map((option, index) => (
              <S.Option
                onClick={() => handleSelect({ close, option, index })}
                key={resolveOptionId({ option })}
              >
                {resolveOptionName({ option })}
              </S.Option>
            ))}
          </S.Options>
        )}
      >
        <div style={{ cursor: "pointer", width }}>
          {/* @ts-ignore */}
          {typeof children === "function"
            ? children({ selectedOption })
            : children}
        </div>
      </Popover>
    </>
  );
}
