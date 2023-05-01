import styled from "styled-components";
import media from "src/common/custom-media";
import { SearchInput as SearchInputBase } from "src/components/SearchInput";

const SearchContainer = styled.div`
  margin-bottom: 30px;
  ${media.greaterThan("tablet")`
    margin-bottom: 0px;
 `}
`;

const SearchInput = styled(SearchInputBase)`
  flex-shrink: 0;
  width: 100%;
`;

export { SearchInput, SearchContainer };
