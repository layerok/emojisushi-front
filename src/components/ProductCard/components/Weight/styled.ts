import styled from "styled-components";
import media from "~common/custom-media";

const Weight = styled.div`
  display: flex;
  font-size: 13px;
  cursor: pointer;
  ${media.lessThan("tablet")`
    font-size: 15px;
  `}
`;

export { Weight };
