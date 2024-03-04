import { SvgIcon } from "../SvgIcon";
import { MinusSvg } from "../svg/MinusSvg";
import { PlusSvg } from "../svg/PlusSvg";
import * as S from "./styled";
import { ButtonFilled } from "../buttons/Button";
import { FlexBox } from "../FlexBox";
import { MouseEventHandler, useContext } from "react";
import { ThemeContext, useTheme } from "styled-components";

export const Counter = ({
  handleDecrement,
  handleIncrement,
  count = 0,
  countColor,
  controlColor,
  delimiterColor,
  hoverControlColor,
}: {
  handleDecrement: MouseEventHandler<HTMLSpanElement>;
  handleIncrement: MouseEventHandler<HTMLSpanElement>;
  count: number;
  countColor: string;
  controlColor: string;
  delimiterColor: string;
  hoverControlColor?: string;
}) => {
  return (
    <FlexBox justifyContent={"center"} style={{ width: "118px" }}>
      <SvgIcon
        width={"25px"}
        onClick={handleDecrement}
        color={controlColor}
        hoverColor={hoverControlColor}
        style={{ cursor: "pointer", marginRight: "15px" }}
      >
        <MinusSvg />
      </SvgIcon>
      <S.Count color={countColor} delimiterColor={delimiterColor}>
        {count}
      </S.Count>
      <SvgIcon
        width={"25px"}
        onClick={handleIncrement}
        color={controlColor}
        hoverColor={hoverControlColor}
        style={{ cursor: "pointer", marginLeft: "15px" }}
      >
        <PlusSvg />
      </SvgIcon>
    </FlexBox>
  );
};

export const LightCounter = ({ handleDecrement, handleIncrement, count }) => {
  const theme = useContext(ThemeContext);
  return (
    <Counter
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
      count={count}
      countColor={"white"}
      controlColor={"#4A4A4A"}
      delimiterColor={"#333333"}
      hoverControlColor={theme.colors.brand}
    />
  );
};

export const DarkCounter = ({ handleDecrement, handleIncrement, count }) => {
  const theme = useTheme();
  return (
    <Counter
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
      count={count}
      countColor={"black"}
      controlColor={"black"}
      delimiterColor={theme.colors.brandDelimiter}
    />
  );
};

export const ButtonCounter = ({
  count,
  handleIncrement,
  handleDecrement,
  width,
}: {
  count: number;
  handleIncrement: MouseEventHandler<HTMLSpanElement>;
  handleDecrement: MouseEventHandler<HTMLSpanElement>;
  width?: string;
}) => {
  return (
    <ButtonFilled
      justifyContent={"space-around"}
      padding={"7px 0"}
      width={width}
    >
      <DarkCounter
        count={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
    </ButtonFilled>
  );
};
