import styled, { css } from "styled-components";
import { ifProp, theme } from "styled-tools";
import { NavLink } from "react-router-dom";

const Categories = styled.div`
  position: relative;
  padding-top: 20px;
`;

const HorizontalContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
`;

const Hint = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
`;

const Category = styled.div`
  margin-right: 16px;
  flex-shrink: 0;
`;
const Chip = styled.span`
  display: flex;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  color: white;

  &:hover {
    color: ${theme("link.active")};
    border: 1px solid ${theme("link.active")};
  }

  border: 1px solid white;
  border-radius: 5px;
  padding: 9px 23px;

  ${ifProp(
    "isActive",
    css`
      color: ${theme("link.active")};
      border: 1px solid ${theme("link.active")};
    `
  )}
`;

export { Categories, Category, Chip, Hint, HorizontalContainer };
