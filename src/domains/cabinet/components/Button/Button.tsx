import styled from "styled-components";

export const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
  padding: 7px 31px;
  min-width: 130px;
  height: 40px;
  color: ${({ theme }) => theme.colors.fg.default};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.canvas.inset4};
  border: 1px solid transparent;

  :hover {
    border: ${(props) => `1px solid ${props.theme.colors.brand}`};
    background: ${({ theme }) => theme.colors.canvas.inset4};
    box-shadow: ${({ theme }) => theme.shadows.brandSofter};
    color: ${({ theme }) => theme.colors.brand};
  }
`;
