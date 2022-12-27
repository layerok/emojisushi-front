import styled from "styled-components";
import media from "../../common/custom-media";

const Container = styled.div`
  width: 100%;
  max-width: 1110px;
  margin: 0 auto;
  ${media.lessThan("pc")`
    max-width: 730px;
  `}
  ${media.lessThan("tablet")`
    max-width: 350px;
  `}
`;

export {
    Container
}
