import * as S from "./styled";
import { ChangeEvent, HTMLProps, ReactElement, useId } from "react";

type IOption = {
  id: number;
  name: string;
};

const Option = ({
  option,
  index,
  length,
  handleChange,
  selected,
  name,
}: {
  option: IOption;
  index: number;
  length: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selected: boolean;
  name: string;
}) => {
  const internal_id = useId();

  return (
    <>
      <S.Input
        length={length}
        index={index}
        id={internal_id}
        value={option.id}
        type={"radio"}
        name={name}
        checked={selected}
        onChange={handleChange}
      />
      <S.Label htmlFor={internal_id}>{option.name}</S.Label>
    </>
  );
};

type ISwitcherProps = Omit<HTMLProps<HTMLDivElement>, "selected" | "name"> & {
  options: IOption[];
  name: string;
  handleChange: ({
    e,
    index,
    option,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    index: number;
    option: IOption;
  }) => void;
  selected: { (option: IOption): boolean } | boolean;
};

export const Switcher = ({
  options = [],
  name,
  handleChange,
  selected,
  ...rest
}: ISwitcherProps): ReactElement => {
  const isSelected = (option) => {
    return typeof selected === "function" ? selected(option) : selected;
  };

  if (!options.length) {
    return null;
  }

  return (
    <S.Wrapper {...rest}>
      {options.map((option, index) => (
        <Option
          option={option}
          length={options.length}
          index={index}
          name={name}
          handleChange={(e) => handleChange({ e, index, option })}
          selected={isSelected(option)}
          key={index}
        />
      ))}
      <S.Slide length={options.length}>
        {options.reduce((acc, option) => {
          if (isSelected(option)) {
            return option.name;
          }
          return acc;
        }, "")}
      </S.Slide>
    </S.Wrapper>
  );
};
