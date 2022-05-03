import styled from "styled-components";
import media from "../../common/custom-media";

const Banner = styled.div`
  margin-top: 40px;
  ${media.lessThan('tablet')`
    margin-top: 26px;
  `}
  
`;

export {
    Banner
}