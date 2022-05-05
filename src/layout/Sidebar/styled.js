import styled from "styled-components";
import {theme} from "styled-tools";
import media from "../../common/custom-media";
import {SearchInput as SearchInputBase} from "../../components/SearchInput";

const Sidebar = styled.div`
  width: 100%;
  
  ${media.greaterThan('pc')`
    width: 255px;
    margin-right: 30px;
  `}
`

const SearchInput = styled(SearchInputBase)`
 ${media.greaterThan('tablet')`
    width: 255px;
 `}
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
    Category,
    SearchInput
}
