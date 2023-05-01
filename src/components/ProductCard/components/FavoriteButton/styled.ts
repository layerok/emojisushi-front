import styled from "styled-components";
import media from "~common/custom-media";

const Favorite = styled.div`
  position: absolute;
  top: 22px;
  right: 12px;
  z-index: 2;

  ${media.lessThan("tablet")`
    top: 30px;
    right: 17px;
  `}

  width: 33px;

  ${media.greaterThan("pc")`
    width: 25px;
  `}
`;

export { Favorite };
