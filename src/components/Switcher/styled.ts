import styled from "styled-components";
import { prop, theme } from "styled-tools";

const Slide = styled.div<{
  length: number;
}>`
  padding: 0 4px;
  position: absolute;
  width: calc(100% / ${prop("length")});
  height: 100%;
  background: ${theme("colors.brand")};
  box-shadow: 0 0 15px ${theme("shadows.brandSofter")};
  border-radius: 10px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease-out;
  user-select: none;
`;
const Wrapper = styled.div`
  position: relative;
  background: #1c1c1c;
  box-shadow: 0 0 15px rgba(34, 34, 34, 0.3);
  border-radius: 10px;
  height: 40px;
  width: 100%;
  display: flex;
`;

const Label = styled.label`
  padding: 0 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const Input = styled.input<{
  length: number;
  index: number;
}>`
  position: relative;
  display: none;
  :checked {
    ~ ${Slide} {
      left: calc(
        (100% / ${prop("length")}) * ${(props) => prop("index")(props)}
      );
    }
  }
`;

export { Slide, Wrapper, Label, Input };
