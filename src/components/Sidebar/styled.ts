import styled from "styled-components";
import media from "src/common/custom-media";

const Sidebar = styled.div`
  width: 100%;
  margin-bottom: 30px;
  flex-shrink: 0;
  ${media.lessThan("pc")`
    display: none;
  `}

  margin-right: 30px;
  width: 255px;
`;

const SearchContainer = styled.div`
  margin-bottom: 0px;
`;

export { Sidebar, SearchContainer };
