import styled, {css} from "styled-components";
import {ifProp, theme} from "styled-tools";
import {NavLink} from "react-router-dom";

const Categories = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`

const Category = styled(NavLink)`
  margin-top: 20px;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: ${theme('link.active')}
  }

  ${ifProp("isActive", css`
    color: ${theme('link.active')}
  `)}

`

export {
    Categories,
    Category,
}