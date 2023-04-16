import styled from "styled-components";
import media from "~common/custom-media";

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan("tablet")`
    margin-top: 28px;
  `}
`;

export { Footer };
