import styled, { css } from "styled-components";
import { ifProp, theme } from "styled-tools";

const Favorite = styled.li`
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  border-top: 1px solid #343434;
  border-bottom: 1px solid #343434;
  padding-top: 28px;
  padding-bottom: 27px;
  margin-top: 30px;
  list-style: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &:hover {
    color: ${theme("colors.brand")};
  }

  ${ifProp(
    "active",
    css`
      color: ${theme("colors.brand")};
    `
  )}
`;

export { Favorite };
