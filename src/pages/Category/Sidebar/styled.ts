import styled from "styled-components";
import media from "../../../common/custom-media";
import { SearchInput as SearchInputBase } from "../../../components/SearchInput";

const Sidebar = styled.div`
  width: 100%;
  margin-bottom: 30px;
  flex-shrink: 0;

  ${media.greaterThan("pc")`
    margin-right: 30px;
    width: 255px;
  `}
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
  ${media.greaterThan("tablet")`
    margin-bottom: 0px;
 `}
`;

const SearchInput = styled(SearchInputBase)`
  flex-shrink: 0;
  width: 100%;
  ${media.greaterThan("tablet")`
    width: 255px;
 `}
`;

export { Sidebar, SearchInput, SearchContainer };
