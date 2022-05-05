import styled from "styled-components";
import {theme} from "styled-tools";
import media from "../../common/custom-media";

const Sidebar = styled.div`
  grid-area: sidebar;
`

const Categories = styled.ul`
  margin-top: 30px;
  ${media.lessThan('pc')`
    display: flex;
    
  `}
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
  ${media.lessThan('pc')`
    margin-right: 20px;
    flex-shrink: 0;
    border: 1px solid white;
    border-radius: 5px;
    padding: 9px 23px;
    
    &:hover {
        border: 1px solid ${theme('link.active')}
    }
  `}
`

export {
    Sidebar,
    Categories,
    Category
}
