import styled from "styled-components";
import {theme} from "styled-tools";

const Categories = styled.ul`
  margin-top: 30px;
`

const Category = styled.li`
  margin-top: 20px;
  text-transform: uppercase;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: ${theme('link.active')}
  }

`

export {
    Categories,
    Category,
}