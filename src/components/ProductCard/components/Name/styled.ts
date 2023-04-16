import styled from "styled-components";
import media from "~common/custom-media";

const Name = styled.div`
  margin-top: 30px;

  ${media.lessThan("tablet")`
    font-size: 18px;
    margin-top: 35px;
  `}
`;

export { Name };
