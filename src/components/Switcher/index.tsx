import Skeleton from "react-loading-skeleton";
import * as S from "./styled";
import { ChangeEvent, HTMLProps, ReactElement, useId } from "react";

type IOption = {
  value: number;
  label: string;
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
        value={option.value}
        type={"radio"}
        name={name}
        checked={selected}
        onChange={handleChange}
      />
      <S.Label htmlFor={internal_id}>{option.label}</S.Label>
    </>
  );
};

type ISwitcherProps = Omit<HTMLProps<HTMLDivElement>, "selected" | "name"> & {
  options: IOption[];
  name: string;
  loading?: boolean;
  handleChange: ({
    e,
    index,
    option,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    index: number;
    option: IOption;
  }) => void;
  value: string | number | null;
};

export const Switcher = ({
  options = [],
  name,
  handleChange,
  loading,
  value,
  ...rest
}: ISwitcherProps): ReactElement => {
  if (loading) {
    return <Skeleton width={"100%"} height={40} />;
  }

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
          selected={option.value === value}
          key={index}
        />
      ))}
      <S.Slide length={options.length}>
        {options.reduce((acc, option) => {
          if (option.value === value) {
            return option.label;
          }
          return acc;
        }, "")}
      </S.Slide>
    </S.Wrapper>
  );
};
