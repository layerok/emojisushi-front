import styled from "styled-components";
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
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 30px;
 ${media.greaterThan('tablet')`
    width: 255px;
    margin-bottom: 0px;
 `}
`


export {
    Sidebar,
    SearchInput
}
