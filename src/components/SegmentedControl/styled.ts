import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasShadow};
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
  height: 40px;
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const Label = styled.label`
  position: relative;
  padding: 0 4px;
  margin: 2px;
  font-size: 14px;
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
  &:checked + label {
    background: #292929;
  }
`;

export { Wrapper, Label, Input };
