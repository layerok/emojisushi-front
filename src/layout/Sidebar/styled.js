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

export {
    Sidebar,
    SearchInput
}
