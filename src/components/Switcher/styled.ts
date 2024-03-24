import styled from "styled-components";
import { prop } from "styled-tools";

const SLIDE_PADDING_HORIZONTAL = 0;
const SLIDE_PADDING_VERTICAL = 0;

const Slide = styled.div<{
  length: number;
}>`
  padding: 0 4px;
  position: absolute;
  width: calc(100% / ${prop("length")} - ${SLIDE_PADDING_HORIZONTAL * 2}px);
  height: calc(100% - ${SLIDE_PADDING_VERTICAL * 2}px);
  background: #292929;
  transform-origin: center;
  top: 50%;
  transform: translateY(-50%);
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
  opacity: 1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease-out;
  user-select: none;
  z-index: 1;
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
  position: relative;
  padding: 0 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  z-index: 2;
`;

const Input = styled.input<{
  length: number;
  index: number;
}>`
  display: none;
  :checked {
    ~ ${Slide} {
      left: calc(
        ${SLIDE_PADDING_HORIZONTAL}px + (100% / ${prop("length")}) *
          ${(props) => prop("index")(props)}
      );
    }
  }
`;

export { Slide, Wrapper, Label, Input };
