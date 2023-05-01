import styled from "styled-components";
import media from "src/common/custom-media";

const Sidebar = styled.div`
  width: 100%;
  margin-bottom: 30px;
  flex-shrink: 0;

  ${media.greaterThan("pc")`
    display: none;
  `}
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${media.greaterThan("tablet")`
    flex-direction: row;
  `}
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
  ${media.greaterThan("tablet")`
    width: 255px;
    flex-shrink: 0;
    margin-bottom: 0px;
 `}
`;

export { Sidebar, SearchContainer, Controls };
