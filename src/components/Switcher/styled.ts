import styled from "styled-components";
import { prop } from "styled-tools";

const Slide = styled.div<{
  length: number;
}>`
  padding: 0 4px;
  position: absolute;
  width: calc(100% / ${prop("length")});
  height: 100%;
  background: ${({ theme }) => theme.colors.brand};
  box-shadow: ${({ theme }) => theme.shadows.brandSofter};
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease-out;
  user-select: none;
`;
const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasShadow};
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
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
