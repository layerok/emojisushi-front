import * as S from "./styled";
import { ChangeEvent, HTMLProps, useId, forwardRef } from "react";
import { SkeletonWrap } from "~components";

type IOption = {
  value: number;
  label: string;
};

const Option = ({
  option,
  index,
  length,
  onChange,
  selected,
  name,
}: {
  option: IOption;
  index: number;
  length: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
        onChange={onChange}
      />
      <S.Label htmlFor={internal_id}>{option.label}</S.Label>
    </>
  );
};

type ISwitcherProps = Omit<
  HTMLProps<HTMLDivElement>,
  "onChange" | "selected" | "name"
> & {
  options: IOption[];
  name: string;
  onChange: ({
    e,
    index,
    option,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    index: number;
    option: IOption;
  }) => void;
  value: string | number | null;
  showSkeleton?: boolean;
};

export const Switcher = forwardRef<HTMLDivElement, ISwitcherProps>(
  (props, ref) => {
    const {
      options = [],
      name,
      onChange,
      value,
      showSkeleton = false,
      as,
      ...rest
    } = props;
    return (
      <SkeletonWrap
        style={{
          width: "100%",
        }}
        loading={showSkeleton}
      >
        <S.Wrapper {...rest} ref={ref}>
          {options.map((option, index) => (
            <Option
              option={option}
              length={options.length}
              index={index}
              name={name}
              onChange={(e) => onChange({ e, index, option })}
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
      </SkeletonWrap>
    );
  }
);
