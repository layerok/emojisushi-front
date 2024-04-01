import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  width: 355px;
  background-color: ${({ theme }) => theme.colors.canvas.inset5};
  color: ${({ theme }) => theme.colors.fg.default};
`;

export { Wrapper };
